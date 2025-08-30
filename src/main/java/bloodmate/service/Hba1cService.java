package bloodmate.service;

import bloodmate.model.dto.Hba1cDto;
import bloodmate.model.entity.Hba1cEntity;
import bloodmate.model.entity.UserEntity;
import bloodmate.model.repository.Hba1cRepository;
import bloodmate.model.repository.UserRepository;
import bloodmate.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class Hba1cService {

    private final Hba1cRepository hba1cRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    /// 당화혈색소 저장 - C
    public boolean createHba1c(String token, Hba1cDto hba1cDto) {
        System.out.println(">> Hba1cService.createHba1c start");
        try {
            int userId = jwtUtil.valnoateToken(token);
            // 단순히 FK 값으로 userId 값을 저장하는 것이라면 UserEntity userEntity = new UserEntity();를 생성하고
            // userEntity.setUserId(userId);를 해도 무방하다. 생각해볼 것
            if(userId > 0) {
                Optional<UserEntity> optional = userRepository.findById(userId);
                if(optional.isPresent()) {
                    UserEntity userEntity = optional.get();
                    Hba1cEntity hba1cEntity = hba1cDto.toEntity();
                    hba1cEntity.setUserEntity(userEntity);
                    hba1cEntity = hba1cRepository.save(hba1cEntity);
                    if(hba1cEntity.getHba1cId() > 0) {
                        System.out.println(">> hba1cEntity = " + hba1cEntity);
                        return true;
                    }
                }
            }
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> Hba1cService.createHba1c error!!!");
            return false;
        } finally {
            System.out.println(">> Hba1cService.createHba1c end");
        }
        return false;
    }
    /// 당화혈색소 전체 불러오기 - R
    public List<Hba1cDto> findAllHba1c(String token) {
        System.out.println(">> Hba1cService.findAllHba1c start");
        try {
            int userId = jwtUtil.valnoateToken(token);
            if(userId > 0) {
                List<Hba1cEntity> hba1cEntityList = hba1cRepository.findByUserIdToHba1c(userId);
                System.out.println(">> hba1cEntityList = " + hba1cEntityList);
                // 스트림을 이용한 변환
                return hba1cEntityList.stream().map(Hba1cEntity::toDto).toList();
            }
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> Hba1cService.findAllHba1c error!!!");
            return null;
        } finally {
            System.out.println(">> Hba1cService.findAllHba1c end");
        }
        return null;
    }
    /// 당화혈색소 수정하기 - U
    public boolean updateHba1c(String token, Hba1cDto hba1cDto, int hba1cId) {
        System.out.println(">> Hba1cService.updateHba1c start");
        try {
            int userId = jwtUtil.valnoateToken(token);
            if(userId > 0) {
                Optional<Hba1cEntity> optional = hba1cRepository.findById(hba1cId);
                if(optional.isPresent()) {
                    Hba1cEntity hba1cEntity = optional.get();
                    hba1cEntity.setHba1cValue(hba1cDto.getHba1cValue());
                    hba1cEntity.setMeasuredAt(hba1cDto.getMeasuredAt());
                    System.out.println(">> hba1cEntity = " + hba1cEntity);
                    return true;
                }
            }
            return false;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> Hba1cService.updateHba1c error!!!");
            return false;
        } finally {
            System.out.println(">> Hba1cService.updateHba1c end");
        }
    }
    /// 당화혈색소 삭제하기 - D
    public boolean deleteHba1c(String token, int hba1cId) {
        System.out.println(">> Hba1cService.deleteHba1c start");
        int userId = jwtUtil.valnoateToken(token);
        if(userId <= 0) { return false; }
        boolean result = hba1cRepository.deleteByHba1cIdAndUserId(hba1cId, userId) > 0;
        System.out.println(">> Hba1cService.deleteHba1c end");
        return result;
    }

}
