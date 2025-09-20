package bloodmate.controller;

import bloodmate.model.dto.UserDto;
import bloodmate.model.dto.VerificationDto;
import bloodmate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    // @Autowired을 사용해야 하지만 @RequiredArgsConstructor이 자동으로 적용
    private final UserService userService;

    /// 회원가입 - C
    @PostMapping("/signup")
    public ResponseEntity<Boolean> signUp(@RequestBody UserDto userDto) {
        System.out.println(">> UserController.signUp start");
        System.out.println(">> userDto = " + userDto);
        boolean result = userService.signUp(userDto);
        System.out.println(">> result = " + result);
        ResponseEntity<Boolean> resultEntity = null;
        if(result) {
            resultEntity = ResponseEntity.status(201).body(true);
        } else {
            resultEntity = ResponseEntity.status(400).body(false);
        }
        System.out.println(">> UserController.signUp end\n");
        return resultEntity;
    }

    /// 로그인 - R
    @PostMapping("/login")
    public ResponseEntity<String> logIn(@RequestBody UserDto userDto) {
        System.out.println(">> UserController.logIn start");
        String token = userService.logIn(userDto);
        ResponseEntity<String> result = null;
        if (
                token.equals("휴먼(장기미접속) 회원입니다.") || token.equals("정지된 회원입니다.") ||
                token.equals("탈퇴된 회원입니다.") || token.equals("존재하지 않는 회원입니다.")
        ) {
            result = ResponseEntity.status(201).body(token);
        } else {
            result = ResponseEntity.status(200).body(token);
        }
        System.out.println(">> UserController.logIn end\n");
        return result;
    }

    /// 로그아웃 - R
    @PostMapping("/logout")
    public boolean logOut(@RequestHeader("Authorization") String token) {
        System.out.println(">> UserController.logOut start");
        System.out.println(">> token = " + token);
        boolean result = userService.logOut(token);
        System.out.println(">> UserController.logOut end\n");
        return result;
    }

    /// 회원 정보 확인 - R
    @GetMapping("/information")
    public ResponseEntity<UserDto> userInformation(@RequestHeader("Authorization") String token) {
        System.out.println(">> UserController.userInformation start");
        System.out.println("token = " + token);
        // userId는 넘기지 않도록 변경하기
        ResponseEntity<UserDto> result = userService.userInformation(token);
        System.out.println(">> UserController.userInformation end\n");
        return result;
    }

    /// 이메일 수정 - P
    @PatchMapping("/information/email")
    public ResponseEntity<Boolean> changeUserEmail(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> receive) {
        System.out.println(">> UserController.changeUserEmail start");
        System.out.println(">> token = " + token);
        System.out.println(">> receive = " + receive);
        ResponseEntity<Boolean> result = userService.changeUserInfo(token, receive);
        System.out.println(">> UserController.changeUserEmail end\n");
        return result;
    }

    /// 전화번호 수정 - P
    @PatchMapping("/information/phone")
    public ResponseEntity<Boolean> changeUserPhone(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> receive) {
        System.out.println(">> UserController.changeUserPhone start");
        System.out.println(">> token = " + token);
        System.out.println(">> receive = " + receive);
        ResponseEntity<Boolean> result = userService.changeUserInfo(token, receive);
        System.out.println(">> UserController.changeUserPhone end\n");
        return result;
    }

    /// 비밀번호 수정(내정보) - P
    @PatchMapping("/information/password")
    public ResponseEntity<Boolean> changeUserPassword(@RequestHeader("Authorization") String token, @RequestBody Map<String ,String> receive) {
        System.out.println(">> UserController.changeUserPassword start");
        System.out.println(">> token = " + token);
        System.out.println(">> receive = " + receive);
        ResponseEntity<Boolean> result = userService.changeUserInfo(token, receive);
        System.out.println(">> UserController.changeUserPassword end\n");
        return result;
    }

    /// 회원 정보 수정 - U
    @PutMapping("/information")
    public boolean updateUser(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto) {
        System.out.println(">> UserController.updateUser start");
        System.out.println(">> token = " + token);
        System.out.println(">> userDto = " + userDto);
        boolean result = userService.updateUser(token, userDto);
        System.out.println(">> UserController.updateUser end\n");
        return result;
    }

    /// 비밀번호 수정(비밀번호 찾기) - U
    @PutMapping("/password")
    public boolean updatePassword(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> passInfo) {
        System.out.println(">> UserController.updatePassword start");
        System.out.println("token = " + token);
        System.out.println("passInfo = " + passInfo);
        boolean result = userService.updatePassword(token, passInfo);
        System.out.println(">> UserController.updatePassword end\n");
        return result;
    }

    /// 회원 탈퇴 - D
    @PostMapping("/information/delete")
    public ResponseEntity<Boolean> deleteUser(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> receive) {
        System.out.println(">> UserController.deleteUser start");
        System.out.println("token = " + token);
        System.out.println("receive = " + receive);
        ResponseEntity<Boolean> result = userService.deleteUser(token, receive);
        System.out.println(">> UserController.deleteUser end\n");
        return result;
    }

    /// 닉네임 중복 확인 - R
    @GetMapping("/check-nickname")
    public boolean checkNickname(@RequestParam("userNickname") String userNickname) {
        System.out.println(">> UserController.checkNickname start");
        System.out.println("userNickname = " + userNickname);
        boolean result = userService.checkNickname(userNickname);
        System.out.println(">> UserController.checkNickname end\n");
        return result;
    }

    /// 아이디 중복 확인 - R
    @GetMapping("/check-login-id")
    public boolean checkLoginId(@RequestParam("userLoginId") String userLoginId) {
        System.out.println("UserController.checkLoginId start");
        System.out.println("userLoginId = " + userLoginId);
        boolean result = userService.checkLoginId(userLoginId);
        System.out.println("UserController.checkLoginId end\n");
        return result;
    }

    /// 전화번호 중복 확인 - R
    @GetMapping("/check-phone")
    public boolean checkPhone(@RequestParam("userPhone") String userPhone) {
        System.out.println(">> UserController.checkPhone start");
        System.out.println(">> userPhone = " + userPhone);
        boolean result = userService.checkPhone(userPhone);
        System.out.println(">> UserController.checkPhone end\n");
        return result;
    }

    /// 로그인 확인 - R
    @GetMapping("/check-login-state")
    public boolean checkLoginState(@RequestHeader("Authorization") String token) {
        System.out.println(">> UserController.checkLoginState start");
        System.out.println("token = " + token);
        boolean result = userService.checkLoginState(token);
        System.out.println(">> UserController.checkLoginState end\n");
        return result;
    }

    /// 인증번호 발송 - R
    @PostMapping("/verification-code")
    public ResponseEntity<String> sendCodeNumber(@RequestBody VerificationDto verificationDto) {
        System.out.println(">> UserController.sendCodeNumber start");
        System.out.println(">> verificationDto.userName = " + verificationDto.getUserName());
        System.out.println(">> verificationDto.userPhone = " + verificationDto.getUserPhone());
        System.out.println(">> verificationDto.UserLoginId = " + verificationDto.getUserLoginId());
        ResponseEntity<String> result = userService.sendCodeNumber(verificationDto);
        System.out.println(">> UserController.sendCodeNumber end\n");
        if(result == null) { return ResponseEntity.status(404).body("오류입니다"); }
        return result;
    }

    /// 인증번호 확인 - R
    @PostMapping("/check-code")
    public ResponseEntity<Boolean> checkCodeNumber(@RequestBody VerificationDto verificationDto) {
        System.out.println(">> UserController.checkCodeNumber start");
        System.out.println(">> verificationDto = " + verificationDto);
        ResponseEntity<Boolean> result = userService.checkCodeNumber(verificationDto);
        System.out.println(">> UserController.checkCodeNumber end\n");
        return result;
    }

    /// 아이디 및 비밀번호 찾기 - R
    @PostMapping("/search")
    public ResponseEntity<String> findByUserLoginIdOrUserPassword(@RequestBody VerificationDto verificationDto) {
        System.out.println(">> UserController.findByUserLoginIdOrUserPassword start");
        System.out.println(">> verificationDto = " + verificationDto);
        ResponseEntity<String> result = userService.findByUserLoginIdOrUserPassword(verificationDto);
        System.out.println(">> UserController.findByUserLoginIdOrUserPassword end\n");
        return result;
    }

    /// 비밀번호 재설정(리셋) - U
    @PostMapping("/reset-password/{token}")
    public ResponseEntity<Boolean> resetPassword(@RequestBody HashMap<String, String> info, @PathVariable("token") String ResetToken) {
        System.out.println(">> UserController.resetPassword start");
        System.out.println(">> ResetToken = " + ResetToken);
        System.out.println(">> info = " + info);
        ResponseEntity<Boolean> result = userService.resetPassword(info, ResetToken);
        System.out.println(">> UserController.resetPassword end\n");
        return result;
    }

}
