package bloodmate.service;

import bloodmate.model.dto.bloodpressure.BloodPressureRequestDto;
import bloodmate.model.entity.BloodPressureEntity;
import bloodmate.model.entity.MeasurementContextEntity;
import bloodmate.model.entity.UserEntity;
import bloodmate.model.repository.BloodPressureRepository;
import bloodmate.model.repository.MeasurementContextRepository;
import bloodmate.model.repository.UserRepository;
import bloodmate.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    public boolean create(String token, BloodPressureRequestDto bloodPressureRequestDto) {
        System.out.println(">> BloodPressureService.create start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return false; }
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
                return bloodPressureEntity.getBloodPressureId() > 0;
            }
            return false;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodPressureService.create error!!!");
            return false;
        } finally {
            System.out.println(">> BloodPressureService.create end");
        }
    }

    /// 혈압 정보 전체 불러오기 - R


    /// 혈압 정보 조건 불러오기 - R


    /// 혈압 정보 수정하기 - U
    public boolean update(String token, BloodPressureRequestDto bloodPressureRequestDto, int bloodPressureId) {
        System.out.println(">> BloodPressureService.update start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return false; }
            Optional<BloodPressureEntity> optional = bloodPressureRepository.findById(bloodPressureId);
            if(optional.isPresent()) {
                BloodPressureEntity bloodPressureEntity = optional.get();
                if(bloodPressureEntity.getUserEntity().getUserId() != userId) { return false; }
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
                return true;
            }
            return false;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodPressureService.update error!!!");
            return false;
        } finally {
            System.out.println(">> BloodPressureService.update end");
        }
    }

    /// 혈압 정보 삭제하기 - D
    public boolean delete(String token, int bloodPressureId) {
        System.out.println(">> BloodPressureService.delete start");
        int userId = jwtUtil.validateToken(token);
        if(userId <= 0) { return false; }
        Optional<BloodPressureEntity> optional = bloodPressureRepository.findById(bloodPressureId);
        if(optional.isPresent()) {
            BloodPressureEntity bloodPressureEntity = optional.get();
            if(bloodPressureEntity.getUserEntity().getUserId() != userId) { return false; }
            bloodPressureRepository.deleteById(bloodPressureId);
            return true;
        }
        System.out.println(">> BloodPressureService.delete end");
        return false;
    }

}
