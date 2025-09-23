package bloodmate.service;

import bloodmate.model.dto.bloodpressure.BloodPressureRequestDto;
import bloodmate.model.dto.bloodpressure.BloodPressureResponseDto;
import bloodmate.model.entity.BloodPressureEntity;
import bloodmate.model.entity.MeasurementContextEntity;
import bloodmate.model.entity.UserEntity;
import bloodmate.model.repository.BloodPressureRepository;
import bloodmate.model.repository.MeasurementContextRepository;
import bloodmate.model.repository.UserRepository;
import bloodmate.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BloodPressureService {

    private final BloodPressureRepository bloodPressureRepository;
    private final MeasurementContextRepository measurementContextRepository;
    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

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
    public List<BloodPressureResponseDto> findAll(String token) {
        System.out.println(">> BloodPressureService.findAll start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return null; }
            List<BloodPressureEntity> bloodPressureEntityList = bloodPressureRepository.findByUserIdToBloodPressure(userId);
            if(bloodPressureEntityList == null) { return null; }
            return bloodPressureEntityList.stream().map(entity -> {
                BloodPressureResponseDto dto = entity.toDto();
                String code = entity.getMeasurementContextEntity().getMcCode();
                String label = BloodSugarService.CONTEXT_LABELS.getOrDefault(code, code);
                dto.setMeasurementContextLabel(label);
                return dto;
            }).toList();
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodPressureService.findAll error!!!");
            return null;
        } finally {
            System.out.println(">> BloodPressureService.findAll end");
        }
    }

    /// 혈압 정보 조건 불러오기 - R
    public List<BloodPressureResponseDto> findByDate(String token, LocalDateTime date) {
        System.out.println(">> BloodPressureService.findByDate");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return null; }
            LocalDate temp = date.toLocalDate();
            LocalDateTime start = temp.atStartOfDay();
            LocalDateTime end = temp.plusDays(1).atStartOfDay();
            List<BloodPressureEntity> bloodPressureEntityList = bloodPressureRepository.findByDateToBloodPressure(userId, start, end);
            if(bloodPressureEntityList == null) { return null; }
            return bloodPressureEntityList.stream().map(BloodPressureEntity::toDto).toList();
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

}
