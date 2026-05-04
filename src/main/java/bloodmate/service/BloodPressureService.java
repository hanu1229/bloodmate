package bloodmate.service;

import bloodmate.model.dto.bloodpressure.BloodPressureRequestDto;
import bloodmate.model.dto.bloodpressure.BloodPressureResponseDto;
import bloodmate.model.dto.bloodsugar.BloodSugarResponseDto;
import bloodmate.model.entity.BloodPressureEntity;
import bloodmate.model.entity.BloodSugarEntity;
import bloodmate.model.entity.MeasurementContextEntity;
import bloodmate.model.entity.UserEntity;
import bloodmate.model.repository.BloodPressureRepository;
import bloodmate.model.repository.MeasurementContextRepository;
import bloodmate.model.repository.UserRepository;
import bloodmate.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class BloodPressureService {

    private final BloodPressureRepository bloodPressureRepository;
    private final MeasurementContextRepository measurementContextRepository;
    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    /// Map.ofEntries() --> readOnly
    public static final Map<String, String> CONTEXT_LABELS = Map.ofEntries(
            Map.entry("MORNING_BEFORE_MEAL", "아침 식전"),
            Map.entry("MORNING_AFTER_MEAL", "아침 식후"),
            Map.entry("LUNCH_BEFORE_MEAL", "점심 식전"),
            Map.entry("LUNCH_AFTER_MEAL", "점심 식후"),
            Map.entry("DINNER_BEFORE_MEAL", "저녁 식전"),
            Map.entry("DINNER_AFTER_MEAL", "저녁 식후"),
            Map.entry("BEFORE_EXERCISE", "운동 전"),
            Map.entry("AFTER_EXERCISE", "운동 후"),
            Map.entry("BEFORE_SLEEP", "취침 전"),
            Map.entry("WAKE_UP", "기상"),
            Map.entry("OTHER", "기타")
    );

    /// Map.ofEntries() --> readOnly
    public static final Map<String, String> CONTEXT_REVERSE_LABELS = Map.ofEntries(
            Map.entry("아침 식전", "MORNING_BEFORE_MEAL"),
            Map.entry("아침 식후", "MORNING_AFTER_MEAL"),
            Map.entry("점심 식전", "LUNCH_BEFORE_MEAL"),
            Map.entry("점심 식후", "LUNCH_AFTER_MEAL"),
            Map.entry("저녁 식전", "DINNER_BEFORE_MEAL"),
            Map.entry("저녁 식후", "DINNER_AFTER_MEAL"),
            Map.entry("운동 전", "BEFORE_EXERCISE"),
            Map.entry("운동 후", "AFTER_EXERCISE"),
            Map.entry("취침 전", "BEFORE_SLEEP"),
            Map.entry("기상", "WAKE_UP"),
            Map.entry("기타", "OTHER")
    );

    /// 혈압 정보 작성 - C
    public ResponseEntity<Boolean> create(String token, BloodPressureRequestDto bloodPressureRequestDto) {
        System.out.println(">> BloodPressureService.create start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return ResponseEntity.status(400).body(false); }
            int measurementContextId = bloodPressureRequestDto.getMeasurementContextId();
            Optional<UserEntity> UserOptional = userRepository.findById(userId);
            Optional<MeasurementContextEntity> measurementOptional = measurementContextRepository.findById(measurementContextId);
            if(UserOptional.isPresent() && measurementOptional.isPresent()) {
                UserEntity userEntity = UserOptional.get();
                MeasurementContextEntity mcEntity = measurementOptional.get();
                BloodPressureEntity bloodPressureEntity = bloodPressureRequestDto.toEntity();
                bloodPressureEntity.setMeasurementContextEntity(mcEntity);
                bloodPressureEntity.setUserEntity(userEntity);
                bloodPressureEntity = bloodPressureRepository.save(bloodPressureEntity);
                if(bloodPressureEntity.getBloodPressureId() > 0) { return ResponseEntity.status(201).body(true); }
            }
            return ResponseEntity.status(400).body(false);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodPressureService.create error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> BloodPressureService.create end");
        }
    }

    /// 혈압 정보 전체 불러오기 - R
    public ResponseEntity<Page<BloodPressureResponseDto>> findAll(String token, int page, int size, String sorting) {
        System.out.println(">> BloodPressureService.findAll start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return null; }
            Pageable pageable;
            if(sorting.equals("DESC")) {
                pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "measuredAt"));
            } else {
                pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "measuredAt"));
            }
            Page<BloodPressureEntity> bloodPressureEntityPage = bloodPressureRepository.findByUserEntity_userId(userId, pageable);
            if(bloodPressureEntityPage == null) { return null; }
            Page<BloodPressureResponseDto> result = bloodPressureEntityPage.map(entity -> {
                BloodPressureResponseDto dto = entity.toDto();
                String code = entity.getMeasurementContextEntity().getMcCode();
                String label = BloodSugarService.CONTEXT_LABELS.getOrDefault(code, code);
                dto.setMeasurementContextLabel(label);
                return dto;
            });
            return ResponseEntity.status(200).body(result);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodPressureService.findAll error!!!!");
            return ResponseEntity.status(400).body(null);
        } finally {
            System.out.println(">> BloodPressureService.findAll end");
        }
    }

    /// 혈압 정보 조건 불러오기 - R
    public ResponseEntity<Page<BloodPressureResponseDto>> findByDate(String token, LocalDate startDate, LocalDate endDate, int context, int page, int size, String sorting) {
        System.out.println(">> BloodPressureService.findByDate");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return null; }
            Sort.Direction direction = "ASC".equalsIgnoreCase(sorting) ? Sort.Direction.ASC : Sort.Direction.DESC;
            Pageable pageable = PageRequest.of(page - 1, size, Sort.by(direction, "measured_at"));
            if(startDate.isEqual(endDate)) { endDate = endDate.plusDays(1); }
            // LocalDate 값에 시분 00:00을 붙여줌
            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = endDate.atStartOfDay().plusDays(1);
            System.out.println(">> startDateTime = " + startDateTime);
            System.out.println(">> endDateTime = " + endDateTime);
            Page<BloodPressureEntity> bloodPressureEntityPage = null;
            if(context == 0) {
                bloodPressureEntityPage = bloodPressureRepository.findByDateToBloodPressure(userId, startDateTime, endDateTime, pageable);
            } else {
                bloodPressureEntityPage = bloodPressureRepository.findByContextToDateToBloodPressure(userId, startDateTime, endDateTime, context, pageable);
            }
            if(bloodPressureEntityPage == null) { ResponseEntity.status(400).body(null); }
            Page<BloodPressureResponseDto> result = bloodPressureEntityPage.map(entity -> {
                BloodPressureResponseDto dto = entity.toDto();
                String code = entity.getMeasurementContextEntity().getMcCode();
                ///  getOrDefault(key, default) --> Map 타입에서 key를 찾고 key가 없으면 default값을 반환 시킴
                String label = CONTEXT_LABELS.getOrDefault(code, code);
                dto.setMeasurementContextLabel(label);
                return dto;
            });
            return ResponseEntity.status(200).body(result);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodPressureService.findByDate error!!!");
            return null;
        } finally {
            System.out.println(">> BloodPressureService.findByDate end");
        }
    }

    /// 혈압 정보 수정하기 - U
    public ResponseEntity<Boolean> update(String token, BloodPressureRequestDto bloodPressureRequestDto, int bloodPressureId) {
        System.out.println(">> BloodPressureService.update start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return ResponseEntity.status(400).body(false); }
            Optional<BloodPressureEntity> optional = bloodPressureRepository.findById(bloodPressureId);
            if(optional.isPresent()) {
                BloodPressureEntity bloodPressureEntity = optional.get();
                if(bloodPressureEntity.getUserEntity().getUserId() != userId) { return ResponseEntity.status(400).body(false); }
                bloodPressureEntity.setBloodPressureSystolic(bloodPressureRequestDto.getBloodPressureSystolic());
                bloodPressureEntity.setBloodPressureDiastolic(bloodPressureRequestDto.getBloodPressureDiastolic());
                bloodPressureEntity.setBloodPressurePulse(bloodPressureRequestDto.getBloodPressurePulse());
                bloodPressureEntity.setMeasuredAt(bloodPressureRequestDto.getMeasuredAt());
                int existingId = bloodPressureEntity.getMeasurementContextEntity().getMcId();
                int newId = bloodPressureRequestDto.getMeasurementContextId();
                if(existingId != newId) {
                    Optional<MeasurementContextEntity> mcOptional = measurementContextRepository.findById(newId);
                    if(mcOptional.isPresent()) {
                        MeasurementContextEntity measurementContextEntity = mcOptional.get();
                        bloodPressureEntity.setMeasurementContextEntity(measurementContextEntity);
                    }
                }
                return ResponseEntity.status(200).body(true);
            }
            return ResponseEntity.status(400).body(false);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodPressureService.update error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> BloodPressureService.update end");
        }
    }

    /// 혈압 정보 삭제하기 - D
    public ResponseEntity<Boolean> delete(String token, int bloodPressureId) {
        System.out.println(">> BloodPressureService.delete start");
        int userId = jwtUtil.validateToken(token);
        if(userId <= 0) { return ResponseEntity.status(400).body(false); }
        Optional<BloodPressureEntity> optional = bloodPressureRepository.findById(bloodPressureId);
        if(optional.isPresent()) {
            BloodPressureEntity bloodPressureEntity = optional.get();
            if(bloodPressureEntity.getUserEntity().getUserId() != userId) { return ResponseEntity.status(400).body(false); }
            bloodPressureRepository.deleteById(bloodPressureId);
            return ResponseEntity.status(200).body(true);
        }
        System.out.println(">> BloodPressureService.delete end");
        return ResponseEntity.status(400).body(false);
    }

    /// 혈압 측정 상황별 15개 최소, 최대 평균 불러오기 - R
    public ResponseEntity<HashMap<String, String>> findAverage(String token, String label) {
        System.out.println(">> BloodPressureService.findAverage start");
        try {
            int sysMin = 0, sysMax = 0, diaMin = 0, diaMax = 0, pulseMin = 0, pulseMax = 0;
            double sysAvg = 0, diaAvg = 0, pulseAvg = 0;
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return ResponseEntity.status(400).body(null); }
            String code = BloodSugarService.CONTEXT_REVERSE_LABELS.get(label);
            System.out.println(">> code = " + code);
            if(code == null) { return ResponseEntity.status(400).body(null); }
            int mcId = measurementContextRepository.findByMCId(code);
            System.out.println(">> mcId = " + mcId);
            List<BloodPressureEntity> entityList = bloodPressureRepository.findAverage(userId, mcId);
            if(entityList == null) { return ResponseEntity.status(400).body(null); }

            System.out.println(">> size = " + entityList.size());
            System.out.println(">> sys = " + entityList.stream().map(BloodPressureEntity::getBloodPressureSystolic).toList());
            System.out.println(">> dia = " + entityList.stream().map(BloodPressureEntity::getBloodPressureDiastolic).toList());
            System.out.println(">> pulse = " + entityList.stream().map(BloodPressureEntity::getBloodPressurePulse).toList());

            // entityList.forEach(e -> System.out.println("id=" + e.getBloodPressureId() + ", at=" + e.getMeasuredAt()));

            OptionalInt tempSysMin = entityList.stream().mapToInt(BloodPressureEntity::getBloodPressureSystolic).min();
            OptionalInt tempSysMax = entityList.stream().mapToInt(BloodPressureEntity::getBloodPressureSystolic).max();
            OptionalDouble tempSysAvg = entityList.stream().mapToDouble(BloodPressureEntity::getBloodPressureSystolic).average();
            OptionalInt tempDiaMin = entityList.stream().mapToInt(BloodPressureEntity::getBloodPressureDiastolic).min();
            OptionalInt tempDiaMax = entityList.stream().mapToInt(BloodPressureEntity::getBloodPressureDiastolic).max();
            OptionalDouble tempDiaAvg = entityList.stream().mapToDouble(BloodPressureEntity::getBloodPressureDiastolic).average();
            OptionalInt tempPulseMin = entityList.stream().mapToInt(BloodPressureEntity::getBloodPressurePulse).min();
            OptionalInt tempPulseMax = entityList.stream().mapToInt(BloodPressureEntity::getBloodPressurePulse).max();
            OptionalDouble tempPulseAvg = entityList.stream().mapToDouble(BloodPressureEntity::getBloodPressurePulse).average();

            sysMin = tempSysMin.orElse(0);
            sysMax = tempSysMax.orElse(0);
            sysAvg = tempSysAvg.orElse(0);
            diaMin = tempDiaMin.orElse(0);
            diaMax = tempDiaMax.orElse(0);
            diaAvg = tempDiaAvg.orElse(0);
            pulseMin = tempPulseMin.orElse(0);
            pulseMax = tempPulseMax.orElse(0);
            pulseAvg = tempPulseAvg.orElse(0);

            HashMap<String, String> temp = new HashMap<>();
            temp.put("sysMin", Integer.toString(sysMin));
            temp.put("sysMax", Integer.toString(sysMax));
            temp.put("sysAvg", Double.toString(sysAvg));
            temp.put("diaMin", Integer.toString(diaMin));
            temp.put("diaMax", Integer.toString(diaMax));
            temp.put("diaAvg", Double.toString(diaAvg));
            temp.put("pulseMin", Integer.toString(pulseMin));
            temp.put("pulseMax", Integer.toString(pulseMax));
            temp.put("pulseAvg", Double.toString(pulseAvg));
            System.out.println(temp.toString());
            return ResponseEntity.status(200).body(temp);
        } catch(Exception e) {
            System.out.println(">> error : " + e);
            System.out.println(">> BloodPressureService.findAverage error!!!");
            return ResponseEntity.status(400).body(null);
        } finally {
            System.out.println(">> BloodPressureService.findAverage end");
        }
    }

}
