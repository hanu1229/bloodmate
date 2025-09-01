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
import org.springframework.stereotype.Service;

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

    /// 혈당 작성 - C
    public boolean createBloodSugar(String token, BloodSugarRequestDto bloodSugarRequestDto) {
        System.out.println(">> BloodSugarService.createBloodSugar start");
        try {
            int userId = jwtUtil.valnoateToken(token);
            if(userId <= 0) { return false; }
            Optional<UserEntity> optional = userRepository.findById(userId);
            if(optional.isPresent()) {
                UserEntity userEntity = optional.get();
                MeasurementContextEntity mcEntity = mcRepository.findById(bloodSugarRequestDto.getMeasurementContextId()).orElse(null);
                if(mcEntity != null) {
                    BloodSugarEntity bloodSugarEntity = bloodSugarRequestDto.toEntity();
                    bloodSugarEntity.setMeasurementContextEntity(mcEntity);
                    bloodSugarEntity.setUserEntity(userEntity);
                    bloodSugarEntity = bloodSugarRepository.save(bloodSugarEntity);
                    if(bloodSugarEntity.getBloodSugarId() <= 0) { return false; }
                    System.out.println(">> bloodSugarEntity = " + bloodSugarEntity);
                    return true;
                }
            }
            System.out.println(">> 오류123");
            return false;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodSugarService.createBloodSugar error!!!");
            return false;
        } finally {
            System.out.println(">> BloodSugarService.createBloodSugar end");
        }
    }
    /// 혈당 전체 불러오기 - R
    public List<BloodSugarResponseDto> findAll(String token) {
        System.out.println(">> BloodSugarService.findAll start");
        try {
            int userId = jwtUtil.valnoateToken(token);
            if(userId <= 0) { return null; }
            List<BloodSugarEntity> bloodSugarEntityList = bloodSugarRepository.findByUserIdToBloodSugar(userId);
            if(bloodSugarEntityList == null) { return null; }
            List<MeasurementContextEntity> mcEntityList = mcRepository.findAll();
            Map<Integer, String> mcMap = new HashMap<>();
            for(int index = 0; index < mcEntityList.size(); index++) {
                mcMap.put(mcEntityList.get(index).getMcId(), mcEntityList.get(index).getMcCode());
            }
            //System.out.println(">> mcMap = " + mcMap);
            return bloodSugarEntityList.stream().map(bloodSugarEntity -> {
                BloodSugarResponseDto bloodSugarResponseDto = bloodSugarEntity.toDto();
                bloodSugarResponseDto.setMeasurementContextCode(mcMap.get(bloodSugarEntity.getMeasurementContextEntity().getMcId()));
                return bloodSugarResponseDto;
            }).toList();
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodSugarService.findAll error!!!");
            return null;
        } finally {
            System.out.println(">> BloodSugarService.findAll end");
        }
    }
    /// 혈당 조건 불러오기(조건 : 날짜) - R
    /// 혈당 수정하기 - U
    public boolean updateBloodSugar(String token, BloodSugarRequestDto bloodSugarRequestDto, int bloodSugarId) {
        System.out.println(">> BloodSugarService.updatedBloodSugar");
        try {
            int userId = jwtUtil.valnoateToken(token);
            if(userId <= 0) { return false; }
            Optional<BloodSugarEntity> optional = bloodSugarRepository.findById(bloodSugarId);
            if(optional.isPresent()) {
                BloodSugarEntity bloodSugarEntity = optional.get();
                bloodSugarEntity.setBloodSugarValue(bloodSugarRequestDto.getBloodSugarValue());
                bloodSugarEntity.setMeasuredAt(bloodSugarRequestDto.getMeasuredAt());
                int existingId = bloodSugarEntity.getMeasurementContextEntity().getMcId();
                int newId = bloodSugarRequestDto.getMeasurementContextId();
                if(existingId != newId) {
                    Optional<MeasurementContextEntity> mcOptional = mcRepository.findById(newId);
                    if(mcOptional.isPresent()) {
                        MeasurementContextEntity mcEntity = mcOptional.get();
                        bloodSugarEntity.setMeasurementContextEntity(mcEntity);
                    }
                }
                return true;
            }
            return false;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodSugarService.updatedBloodSugar error!!!");
            return false;
        } finally {
            System.out.println(">> BloodSugarService.updatedBloodSugar");
        }
    }
    /// 혈당 삭제하기 - D

}
