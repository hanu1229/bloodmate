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

    /// 혈당 정보 작성 - C
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

    /// 혈당 정보 전체 불러오기 - R
    public List<BloodSugarResponseDto> findAll(String token) {
        System.out.println(">> BloodSugarService.findAll start");
        try {
            int userId = jwtUtil.valnoateToken(token);
            if(userId <= 0) { return null; }
            List<BloodSugarEntity> bloodSugarEntityList = bloodSugarRepository.findByUserIdToBloodSugar(userId);
            if(bloodSugarEntityList == null) { return null; }
            return bloodSugarEntityList.stream().map(BloodSugarEntity::toDto).toList();
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BloodSugarService.findAll error!!!");
            return null;
        } finally {
            System.out.println(">> BloodSugarService.findAll end");
        }
    }

    /// 혈당 정보 조건 불러오기(조건 : 날짜) - R
    public List<BloodSugarResponseDto> findByDate(String token, LocalDateTime date) {
        System.out.println(">> BloodSugarService.findByDate start");
        try {
            int userId = jwtUtil.valnoateToken(token);
            if(userId <= 0) { return null; }
            LocalDate temp = date.toLocalDate();
            System.out.println(">> temp = " + temp);
            // 선택한 날의 시작 시간 설정 00:00:00
            LocalDateTime start = temp.atStartOfDay();
            System.out.println(">> start = " + start);
            // 선택한 날의 하루 뒤로 설정하고 시작 시간 설정 00:00:00
            LocalDateTime end = temp.plusDays(1).atStartOfDay();
            System.out.println(">> end = " + end);
            List<BloodSugarEntity> bloodSugarEntityList = bloodSugarRepository.findByDateToBloodSugar(userId, start, end);
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

    /// 혈당 정보 삭제하기 - D
    public boolean deleteBloodSugar(String token, int bloodSugarId) {
        System.out.println(">> BloodSugarService.deleteBloodSugar start");
        int userId = jwtUtil.valnoateToken(token);
        if(userId <= 0) { return false; }
        bloodSugarRepository.deleteById(bloodSugarId);
        System.out.println(">> BloodSugarService.deleteBloodSugar end");
        return true;
    }

}
