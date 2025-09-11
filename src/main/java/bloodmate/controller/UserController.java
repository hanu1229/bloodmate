package bloodmate.controller;

import bloodmate.model.dto.UserDto;
import bloodmate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController {

    // @Autowired을 사용해야 하지만 @RequiredArgsConstructor이 자동으로 적용
    private final UserService userService;

    /// 회원가입 - C
    @PostMapping("/signup")
    public boolean signUp(@RequestBody UserDto userDto) {
        System.out.println(">> UserController.signUp start");
        System.out.println(">> userDto = " + userDto);
        boolean result = userService.signUp(userDto);
        System.out.println(">> result = " + result);
        System.out.println(">> UserController.signUp end\n");
        return result;
    }

    /// 로그인 - R
    @PostMapping("/login")
    public ResponseEntity<String> logIn(@RequestBody UserDto userDto) {
        System.out.println(">> UserController.logIn start");
        String result = userService.logIn(userDto);
        ResponseEntity<String> str = null;
        if (
                result.equals("휴먼(장기미접속) 회원입니다.") || result.equals("정지된 회원입니다.") ||
                result.equals("탈퇴된 회원입니다.") || result.equals("존재하지 않는 회원입니다.")) {
            str = ResponseEntity.status(201).body(result);
        } else {
            str = ResponseEntity.status(200).body(result);
        }
        System.out.println(">> UserController.logIn end\n");
        return str;
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
    public UserDto userInformation(@RequestHeader("Authorization") String token) {
        System.out.println(">> UserController.userInformation start");
        System.out.println("token = " + token);
        // userId는 넘기지 않도록 변경하기
        UserDto result = userService.userInformation(token);
        System.out.println(">> UserController.userInformation end\n");
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

    /// 비밀번호 수정 - U
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
    public boolean deleteUser(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto) {
        System.out.println(">> UserController.deleteUser start");
        System.out.println("token = " + token);
        System.out.println("userDto.getUserPassword = " + userDto.getUserPassword());
        boolean result = userService.deleteUser(token, userDto.getUserPassword());
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

    /// 로그인 확인 - R
    @GetMapping("/check-login-state")
    public boolean checkLoginState(@RequestHeader("Authorization") String token) {
        System.out.println(">> UserController.checkLoginState start");
        System.out.println("token = " + token);
        boolean result = userService.checkLoginState(token);
        System.out.println(">> UserController.checkLoginState end\n");
        return result;
    }

}
