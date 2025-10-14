package bloodmate.service;

import bloodmate.model.dto.bloodsugar.BloodSugarRequestDto;
import bloodmate.model.dto.bloodsugar.BloodSugarResponseDto;
import bloodmate.model.entity.BloodSugarEntity;
import bloodmate.model.entity.MeasurementContextEntity;
import bloodmate.model.entity.UserEntity;
import bloodmate.model.repository.BloodSugarRepository;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BloodSugarService {

    private final BloodSugarRepository bloodSugarRepository;
    private final UserRepository userRepository;
    private final MeasurementContextRepository mcRepository;
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

    /// 혈당 정보 작성 - C
    public ResponseEntity<Boolean> create(String token, BloodSugarRequestDto bloodSugarRequestDto) {
        System.out.println(">> BloodSugarService.create start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return ResponseEntity.status(400).body(false); }
            Optional<UserEntity> optional = userRepository.findById(userId);
            if(optional.isPresent()) {
                UserEntity userEntity = optional.get();
                MeasurementContextEntity mcEntity = mcRepository.findById(bloodSugarRequestDto.getMeasurementContextId()).orElse(null);
                if(mcEntity != null) {
                    BloodSugarEntity bloodSugarEntity = bloodSugarRequestDto.toEntity();
                    bloodSugarEntity.setMeasurementContextEntity(mcEntity);
                    bloodSugarEntity.setUserEntity(userEntity);
                    bloodSugarEntity = bloodSugarRepository.save(bloodSugarEntity);
                    if(bloodSugarEntity.getBloodSugarId() <= 0) { return ResponseEntity.status(400).body(false); }
                    System.out.println(">> bloodSugarEntity = " + bloodSugarEntity);
                    return ResponseEntity.status(201).body(true);
                }
            }
            System.out.println(">> 오류123");
            return ResponseEntity.status(400).body(false);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodSugarService.create error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> BloodSugarService.create end");
        }
    }

    /// 혈당 정보 전체 불러오기 - R
//    public List<BloodSugarResponseDto> findAll(String token) {
//        System.out.println(">> BloodSugarService.findAll start");
//        try {
//            int userId = jwtUtil.validateToken(token);
//            if(userId <= 0) { return null; }
//            List<BloodSugarEntity> bloodSugarEntityList = bloodSugarRepository.findByUserIdToBloodSugar(userId);
//            if(bloodSugarEntityList == null) { return null; }
//            return bloodSugarEntityList.stream().map(entity -> {
//                BloodSugarResponseDto dto = entity.toDto();
//                String code = entity.getMeasurementContextEntity().getMcCode();
//                /// getOrDefault(key, default) --> Map 타입에서 key를 찾고 key가 없으면 default값을 반환 시킴
//                String label = CONTEXT_LABELS.getOrDefault(code, code);
//                dto.setMeasurementContextLabel(label);
//                return dto;
//            }).toList();
//        } catch(Exception e) {
//            System.out.println(">> " + e);
//            System.out.println(">> BloodSugarService.findAll error!!!");
//            return null;
//        } finally {
//            System.out.println(">> BloodSugarService.findAll end");
//        }
//    }

    /// 혈당 정보 전체 불러오기 - R
    public ResponseEntity<Page<BloodSugarResponseDto>> findAll(String token, int page, int size, String sorting) {
        System.out.println(">> BloodSugarService.findAll start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return null; }
            Pageable pageable;
            if(sorting.equals("DESC")) {
                pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "measuredAt"));
            } else {
                pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "measuredAt"));
            }
            Page<BloodSugarEntity> bloodSugarEntityPage = bloodSugarRepository.findByUserEntity_UserId(userId, pageable);
            if(bloodSugarEntityPage == null) { return null; }
            Page<BloodSugarResponseDto> result = bloodSugarEntityPage.map(entity -> {
                BloodSugarResponseDto dto = entity.toDto();
                String code = entity.getMeasurementContextEntity().getMcCode();
                /// getOrDefault(key, default) --> Map 타입에서 key를 찾고 key가 없으면 default값을 반환 시킴
                String label = CONTEXT_LABELS.getOrDefault(code, code);
                dto.setMeasurementContextLabel(label);
                return dto;
            });
            return ResponseEntity.status(200).body(result);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodSugarService.findAll error!!!");
            return ResponseEntity.status(400).body(null);
        } finally {
            System.out.println(">> BloodSugarService.findAll end");
        }
    }

    /// 혈당 정보 조건 불러오기(조건 : 날짜) - R
    public List<BloodSugarResponseDto> findByDate(String token, LocalDateTime startDate, LocalDateTime endDate, int context, int page, int size, String sorting) {
        System.out.println(">> BloodSugarService.findByDate start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return null; }
            Pageable pageable;
            if(sorting.equals("DESC")) {
                pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "measuredAt"));
            } else {
                pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "measuredAt"));
            }
            if(startDate.isEqual(endDate)) { endDate = endDate.plusDays(1); }
            Page<BloodSugarEntity> bloodSugarEntityList = bloodSugarRepository.findByDateToBloodSugar(userId, startDate, endDate, context, pageable);
            if(bloodSugarEntityList == null) { return null; }
            return bloodSugarEntityList.stream().map(BloodSugarEntity::toDto).toList();
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodSugarService.findByDate error!!!");
            return null;
        } finally {
            System.out.println(">> BloodSugarService.findByDate end");
        }
    }

    /// 혈당 정보 수정하기 - U
    public ResponseEntity<Boolean> update(String token, BloodSugarRequestDto bloodSugarRequestDto, int bloodSugarId) {
        System.out.println(">> BloodSugarService.updated start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return ResponseEntity.status(400).body(false); }
            Optional<BloodSugarEntity> optional = bloodSugarRepository.findById(bloodSugarId);
            if(optional.isPresent()) {
                BloodSugarEntity bloodSugarEntity = optional.get();
                if(bloodSugarEntity.getUserEntity().getUserId() != userId) { return ResponseEntity.status(400).body(false); }
                bloodSugarEntity.setBloodSugarValue(bloodSugarRequestDto.getBloodSugarValue());
                bloodSugarEntity.setMeasuredAt(bloodSugarRequestDto.getMeasuredAt());
                int existingId = bloodSugarEntity.getMeasurementContextEntity().getMcId();
                int newId = bloodSugarRequestDto.getMeasurementContextId();
                if(existingId != newId) {
                    Optional<MeasurementContextEntity> mcOptional = mcRepository.findById(newId);
                    if(mcOptional.isPresent()) {
                        MeasurementContextEntity mcEntity = mcOptional.get();
                        bloodSugarEntity.setMeasurementContextEntity(mcEntity);
                        System.out.println(">> bloodSugarEntity = " + bloodSugarEntity);
                    }
                }
                return ResponseEntity.status(200).body(true);
            }
            return ResponseEntity.status(400).body(false);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodSugarService.updated error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> BloodSugarService.updated end");
        }
    }

    /// 혈당 정보 삭제하기 - D
    public ResponseEntity<Boolean> delete(String token, int bloodSugarId) {
        System.out.println(">> BloodSugarService.delete start");
        int userId = jwtUtil.validateToken(token);
        if(userId <= 0) { return ResponseEntity.status(400).body(false); }
        Optional<BloodSugarEntity> optional = bloodSugarRepository.findById(bloodSugarId);
        if(optional.isPresent()) {
            BloodSugarEntity bloodSugarEntity = optional.get();
            if(bloodSugarEntity.getUserEntity().getUserId() != userId) { return ResponseEntity.status(400).body(false); }
            bloodSugarRepository.deleteById(bloodSugarId);
            return ResponseEntity.status(200).body(true);
        }
        bloodSugarRepository.deleteById(bloodSugarId);
        System.out.println(">> BloodSugarService.delete end");
        return ResponseEntity.status(400).body(false);
    }

}
