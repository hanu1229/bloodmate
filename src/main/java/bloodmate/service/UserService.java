package bloodmate.service;

import bloodmate.model.dto.UserDto;
import bloodmate.model.dto.VerificationDto;
import bloodmate.model.entity.UserEntity;
import bloodmate.model.entity.VerificationEntity;
import bloodmate.model.repository.UserRepository;
import bloodmate.model.repository.VerificationRepository;
import bloodmate.util.JwtUtil;
import bloodmate.util.VerificationNumber;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final VerificationRepository verificationRepository;

    private final JwtUtil jwtUtil;

    /// 회원가입 - C
    public boolean signUp(UserDto userDto) {
        System.out.println(">> UserService.signUp start");
        System.out.println(">> userDto = " + userDto);
        boolean result = false;
        try{
            String userLoginId = userDto.getUserLoginId();
            String userNickname = userDto.getUserNickname();
            // 데이터베이스에 중복되는 아이디와 닉네임이 없을 경우 실행
            if(!checkLoginId(userLoginId) && !checkNickname(userNickname)) {
                System.out.println(">> 중복되는 아이디와 닉네임이 없음으로 회원가입을 진행합니다.");
                userDto.setUserState(1);
                System.out.println("userDto = " + userDto);
                UserEntity userEntity = userRepository.save(userDto.toEntity());
                int id = userEntity.getUserId();
                result = id > 0;
            }
        } catch(Exception e) {
            System.out.println(">> userService.signUp error!!!");
            return result;
        }
        finally {
            System.out.println(">> UserService.signUp end");
        }
        return result;
    }

    /// 로그인 - R
    public String logIn(UserDto userDto) {
        System.out.println(">> UserService.logIn start");
        String token = null;
        Optional<UserEntity> optional = userRepository.findByUserLoginId(userDto.getUserLoginId(), userDto.getUserPassword());
        if(optional.isPresent()) {
            UserDto user = optional.get().toDto();
            if(user.getUserState() == 1) {
                int userId = user.getUserId();
                System.out.println(">> 정상적인 회원입니다.");
                System.out.println(">> userId = " + userId);
                token = jwtUtil.createToken(userId);
                System.out.println(">> token = " + token);
                System.out.println(">> UserService.logIn end");
            } else if(user.getUserState() == 2) {
                System.out.println(">> 휴먼(장기미접속) 회원입니다.");
                System.out.println(">> UserService.logIn end");
                return "휴먼(장기미접속) 회원입니다.";
            } else if(user.getUserState() == 3) {
                System.out.println(">> 정지된 회원입니다.");
                System.out.println(">> UserService.logIn end");
                return "정지된 회원입니다.";
            } else if(user.getUserState() == 0) {
                System.out.println(">> 탈퇴된 회원입니다.");
                System.out.println(">> UserService.logIn end");
                return "탈퇴된 회원입니다.";
            }
        } else {
            System.out.println(">> 존재하지 않는 회원입니다.");
            System.out.println(">> UserService.logIn end");
            return "존재하지 않는 회원입니다.";
        }
        return token;
    }

    /// 로그아웃 - R
    public boolean logOut(String token) {
        System.out.println(">> UserService.logOut start");
        int userId = jwtUtil.validateToken(token);
        if(userId > 0) {
            jwtUtil.deleteToken(userId);
            System.out.println(">> UserService.logOut end");
            return true;
        }
        System.out.println(">> UserService.logOut end");
        return false;
    }

    /// 회원 정보 확인 - R
    public UserDto userInformation(String token) {
        System.out.println(">> UserService.userInformation start");

        int userId = jwtUtil.validateToken(token);
        if(userId > 0) {
            Optional<UserEntity> optional = userRepository.findById(userId);
            if(optional.isPresent()) {
                UserDto userDto = optional.get().toDto();
                System.out.println("userDto = " + userDto);
                System.out.println(">> UserService.userInformation end");
                return userDto;
            }
        }
        System.out.println(">> UserService.userInformation end");
        return null;
    }

    /// 회원 정보 수정 - U
    public boolean updateUser(String token, UserDto userDto) {
        System.out.println(">> UserService.updateUser start");
        int userId = jwtUtil.validateToken(token);
        if(userId > 0) {
            Optional<UserEntity> optional = userRepository.findById(userId);
            if(optional.isPresent()) {
                UserEntity userEntity = optional.get();
                userEntity.setUserNickname(userDto.getUserNickname());
                userEntity.setUserName(userDto.getUserName());
                userEntity.setUserBirthDate(userDto.getUserBirthDate());
                userEntity.setUserPhone(userDto.getUserPhone());
                userEntity.setUserEmail(userDto.getUserEmail());
                System.out.println(">> UserService.updateUser end");
                return true;
            }
        }
        System.out.println(">> UserService.updateUser end");
        return false;
    }

    /// 비밀번호 수정 - U
    public boolean updatePassword(String token, Map<String, String> passInfo) {
        System.out.println(">> UserService.updatePassword start");
        int userId = jwtUtil.validateToken(token);
        if(userId > 0) {
            Optional<UserEntity> optional = userRepository.findById(userId);
            if(optional.isPresent()) {
                UserEntity userEntity = optional.get();
                UserDto userDto = userEntity.toDto();
                if(userDto.getUserPassword().equals(passInfo.get("userPassword"))) {
                    userEntity.setUserPassword(passInfo.get("newPassword"));
                    System.out.println(">> UserService.updatePassword end");
                    return true;
                } else {
                    System.out.println(">> 기존 비밀번호가 틀립니다.");
                }
            }
        }
        System.out.println(">> UserService.updatePassword end");
        return false;
    }

    /// 회원 탈퇴 - D
    public boolean deleteUser(String token, String userPassword) {
        System.out.println(">> UserService.deleteUser start");
        int userId = jwtUtil.validateToken(token);
        if(userId > 0) {
            Optional<UserEntity> optional = userRepository.findById(userId);
            if(optional.isPresent()) {
                UserEntity userEntity = optional.get();
                if(userEntity.getUserPassword().equals(userPassword)) {
                    userEntity.setUserState(0);
                    jwtUtil.deleteToken(userId);
                    System.out.println(">> UserService.deleteUser end");
                    return true;
                }
            }
        }
        System.out.println(">> UserService.deleteUser end");
        return false;
    }

    /// <b>닉네임 중복 확인 - R</b></br>
    /// 닉네임이 존재하면 true
    public boolean checkNickname(String userNickname) {
        System.out.println(">> UserService.checkNickname start");
        boolean result = userRepository.existsByUserNickname(userNickname);
        System.out.println(">> UserService.checkNickname end");
        return result;
    }

    /// <b>아이디 중복 확인 - R</b></br>
    /// 아이디가 존재하면 true
    public boolean checkLoginId(String userLoginId) {
        System.out.println("UserService.checkLoginId start");
        boolean result = userRepository.existsByUserLoginId(userLoginId);
        System.out.println("UserService.checkLoginId end");
        return result;
    }

    /// <b>전화번호 중복 확인 - R</b></br>
    /// 전화번호가 존재하면 true
    public boolean checkPhone(String userPhone) {
        System.out.println(">> UserService.checkPhone start");
        boolean result = userRepository.existsByUserPhone(userPhone);
        System.out.println(">> UserService.checkPhone end");
        return result;
    }

    /// 로그인 확인 - R
    public boolean checkLoginState(String token) {
        System.out.println(">> UserService.checkLoginState start");
        int userId = jwtUtil.validateToken(token);
        if(userId > 0) {
            UserEntity userEntity = userRepository.findById(userId).orElse(null);
            if(userEntity != null) {
                UserDto userDto = userEntity.toDto();
                if(userDto.getUserState() == 0 || userDto.getUserState() == 2 || userDto.getUserState() == 3) {
                    System.out.println(">> UserService.checkLoginState end");
                    return false;
                } else if(userDto.getUserState() == 1) {
                    System.out.println(">> UserService.checkLoginState end");
                    return true;
                }
            }
        }
        System.out.println(">> UserService.checkLoginState end");
        return false;
    }

    /// 인증번호 발송 - R
    public ResponseEntity<String> sendCodeNumber(VerificationDto verificationDto) {
        System.out.println(">> UserService.sendCodeNumber start");
        try {
            String userName = verificationDto.getUserName();
            String userPhone = verificationDto.getUserPhone();
            String userLoginId = verificationDto.getUserLoginId();
            if(userLoginId == null) {
                boolean isExist = userRepository.existsByUserNameAndUserPhone(userName, userPhone);
                if(!isExist) { return ResponseEntity.status(404).body("존재하지 않는 이름 또는 전화번호입니다."); }
            } else {
                boolean isExist = userRepository.existsByUserNameAndUserPhoneAndUserLoginId(userName, userPhone, userLoginId);
                if(!isExist) { return ResponseEntity.status(404).body("존재하지 않는 아이디 또는 이름 또는 전화번호입니다."); }
            }
            String number = VerificationNumber.createNumber();
            System.out.println(">> number = " + number);
            verificationDto.setVerificationCode(number);
            verificationDto.setIsVerification(0);
            VerificationEntity verificationEntity = verificationDto.toEntity();
            verificationEntity = verificationRepository.save(verificationEntity);
            if(verificationEntity.getVerificationId() <= 0) { return null; }
            System.out.println(">> verificationEntity = " + verificationEntity);
            return ResponseEntity.status(201).body(number);
        } catch (Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> UserService.sendCodeNumber error!!!");
            return null;
        } finally {
            System.out.println(">> UserService.sendCodeNumber end");
        }
    }

    /// 인증번호 확인 - R
    public ResponseEntity<Boolean> checkCodeNumber(VerificationDto verificationDto) {
        System.out.println(">> UserService.checkCodeNumber start");
        try {
            String userName = verificationDto.getUserName();
            String userPhone = verificationDto.getUserPhone();
            String userLoginId = verificationDto.getUserLoginId();
            String code = verificationDto.getVerificationCode();
            VerificationEntity verificationEntity;
            if(userLoginId == null) {
                verificationEntity = verificationRepository.findByUserNameAndUserPhone(userName, userPhone);
            } else {
                verificationEntity = verificationRepository.findByUserNameAndUserPhoneAndUserLoginId(userName, userPhone, userLoginId);
            }
            if(verificationEntity.getIsVerification() == 0 && verificationEntity.getVerificationCode().equals(code)) {
                verificationEntity.setIsVerification(1);
                return ResponseEntity.status(200).body(true);
            }
            return ResponseEntity.status(404).body(false);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> UserService.checkCodeNumber error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> UserService.checkCodeNumber end");
        }
    }

    /// 아이디 및 비밀번호 찾기 - R
    public ResponseEntity<String> findByUserLoginIdOrUserPassword(VerificationDto verificationDto) {
        System.out.println(">> UserService.findByUserLoginIdOrUserPassword");
        try {
            String userName = verificationDto.getUserName();
            String userPhone = verificationDto.getUserPhone();
            String userLoginId = verificationDto.getUserLoginId();
            String code = verificationDto.getVerificationCode();
            VerificationEntity verificationEntity;
            UserEntity userEntity;
            String str;
            if(userLoginId == null) {
                verificationEntity = verificationRepository.findByUserNameAndUserPhone(userName, userPhone);
                userEntity = userRepository.findByUserNameAndUserPhone(userName, userPhone);
                str = "아이디";
            } else {
                verificationEntity = verificationRepository.findByUserNameAndUserPhoneAndUserLoginId(userName, userPhone, userLoginId);
                userEntity = userRepository.findByUserNameAndUserPhoneAndUserLoginId(userName, userPhone, userLoginId);
                str = "비밀번호";
            }
            if(
                    verificationEntity.getIsUsed() == 0 &&
                    verificationEntity.getIsVerification() == 1 &&
                    verificationEntity.getVerificationCode().equals(code) &&
                    verificationEntity.getUserName().equals(userName) &&
                    verificationEntity.getUserPhone().equals(userPhone)
            ) {
                verificationEntity.setIsUsed(1);
                if(userEntity.getUserId() <= 0) { return ResponseEntity.status(404).body("아이디가 존재하지 않습니다."); }
                if(str.equals("아이디")) { return ResponseEntity.status(201).body(userEntity.getUserLoginId()); }
                else {
                    String resetToken = UUID.randomUUID().toString();
                    verificationEntity.setResetToken(resetToken);
                    System.out.println(">> resetToken = " + resetToken);
                    return ResponseEntity.status(201).body(resetToken);
                }
            }
            return ResponseEntity.status(404).body("존재하지 않는 인증코드입니다.");
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> UserService.findByUserLoginIdOrUserPassword error!!!");
            return ResponseEntity.status(404).body("아이디가 존재하지 않습니다.");
        } finally {
            System.out.println(">> UserService.findByUserLoginIdOrUserPassword end");
        }
    }

    /// 비밀번호 재설정(리셋) - U
    public ResponseEntity<Boolean> resetPassword(HashMap<String, String> info, String ResetToken) {
        System.out.println(">> UserService.resetPassword start");
        try {
            String userLoginId = info.get("userLoginId");
            String userName = info.get("userName");
            String userPhone = info.get("userPhone");
            String verificationCode = info.get("verificationCode");
            String newPassword = info.get("newPassword");
            int isExist = userRepository.existsByCode(userName, userPhone, userLoginId, verificationCode, ResetToken);
            boolean bool;
            if(isExist == 0) { bool = false; } else { bool = true; }
            if(!bool) { return ResponseEntity.status(404).body(false); }
            UserEntity userEntity = userRepository.findByUserNameAndUserPhoneAndUserLoginId(userName, userPhone, userLoginId);
            if(userEntity == null) { return ResponseEntity.status(404).body(false); }
            if(userEntity.getUserPassword().equals(newPassword)) { return ResponseEntity.status(201).body(false); }
            userEntity.setUserPassword(newPassword);
            return ResponseEntity.status(201).body(true);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> UserService.resetPassword error!!!");
            return ResponseEntity.status(404).body(false);
        } finally {
            System.out.println(">> UserService.resetPassword end");
        }
    }

}
