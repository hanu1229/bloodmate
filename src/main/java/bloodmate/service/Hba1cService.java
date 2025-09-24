package bloodmate.service;

import bloodmate.model.dto.Hba1cDto;
import bloodmate.model.entity.Hba1cEntity;
import bloodmate.model.entity.UserEntity;
import bloodmate.model.repository.Hba1cRepository;
import bloodmate.model.repository.UserRepository;
import bloodmate.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    /// 당화혈색소 정보 저장 - C
    public ResponseEntity<Boolean> create(String token, Hba1cDto hba1cDto) {
        System.out.println(">> Hba1cService.create start");
        try {
            int userId = jwtUtil.validateToken(token);
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
                        return ResponseEntity.status(201).body(true);
                    }
                }
            }
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> Hba1cService.create error!!!");
            return ResponseEntity.status(201).body(false);
        } finally {
            System.out.println(">> Hba1cService.create end");
        }
        return ResponseEntity.status(201).body(false);
    }

    /// 당화혈색소 정보 전체 불러오기 - R
    public ResponseEntity<List<Hba1cDto>> findAll(String token) {
        System.out.println(">> Hba1cService.findAll start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId > 0) {
                List<Hba1cEntity> hba1cEntityList = hba1cRepository.findByUserIdToHba1c(userId);
                System.out.println(">> hba1cEntityList = " + hba1cEntityList);
                List<Hba1cDto> result = hba1cEntityList.stream().map(Hba1cEntity::toDto).toList();
                // 스트림을 이용한 변환
                return ResponseEntity.status(200).body(result);
            }
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> Hba1cService.findAll error!!!");
            return ResponseEntity.status(400).body(null);
        } finally {
            System.out.println(">> Hba1cService.findAll end");
        }
        return ResponseEntity.status(400).body(null);
    }

    /// 당화혈색소 정보 수정하기 - U
    public ResponseEntity<Boolean> update(String token, Hba1cDto hba1cDto, int hba1cId) {
        System.out.println(">> Hba1cService.update start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId > 0) {
                Optional<Hba1cEntity> optional = hba1cRepository.findById(hba1cId);
                if(optional.isPresent()) {
                    Hba1cEntity hba1cEntity = optional.get();
                    if(hba1cEntity.getUserEntity().getUserId() != userId) { return ResponseEntity.status(400).body(false); }
                    hba1cEntity.setHba1cValue(hba1cDto.getHba1cValue());
                    hba1cEntity.setMeasuredAt(hba1cDto.getMeasuredAt());
                    hba1cEntity.setNextTextAt(hba1cDto.getNextTestAt());
                    System.out.println(">> hba1cEntity = " + hba1cEntity);
                    return ResponseEntity.status(200).body(true);
                }
            }
            return ResponseEntity.status(400).body(false);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> Hba1cService.update error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> Hba1cService.update end");
        }
    }

    /// 당화혈색소 정보 삭제하기 - D
    public ResponseEntity<Boolean> delete(String token, int hba1cId) {
        System.out.println(">> Hba1cService.delete start");
        int userId = jwtUtil.validateToken(token);
        if(userId <= 0) { return ResponseEntity.status(400).body(false); }
        boolean result = hba1cRepository.deleteByHba1cIdAndUserId(hba1cId, userId) > 0;
        System.out.println(">> Hba1cService.delete end");
        return ResponseEntity.status(200).body(result);
    }

}
