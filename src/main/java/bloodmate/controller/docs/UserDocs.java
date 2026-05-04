package bloodmate.controller.docs;

import bloodmate.model.dto.UserDto;
import bloodmate.model.dto.VerificationDto;
import bloodmate.model.dto.bloodsugar.BloodSugarResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Tag(name = "01. 회원 API (User Controller)", description = "회원 관련 API 모음")
public interface UserDocs {

    /// 회원가입 - C
    @Operation(summary = "회원 회원가입", description = "아이디, 비밀번호, 사용할 닉네임, 이름, 생년월일, 전화번호, 이메일을 입력받아 회원을 생성합니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "회원가입 요청 정보",
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = UserDto.class),
                    examples = @ExampleObject(
                            name = "정상 회원가입 요청 예시",
                            summary = "정상 회원가입 요청 예시",
                            value = """
                                    {
                                        "userLoginId" : "test1997",
                                        "userPassword" : "!h1234",
                                        "userNickname" : "테스터1997",
                                        "userName" : "최영구",
                                        "userBirthDate" : "1997-05-05",
                                        "userPhone" : "010-1234-1234",
                                        "userEmail" : "test1997@gmail.com"
                                    }
                                    """

                    )
            )
    )
    public ResponseEntity<Boolean> signUp(@RequestBody UserDto userDto);

    /// 로그인 - R
    @Operation(summary = "회원 로그인", description = "회원을 로그인시킵니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = UserDto.class, type = "UserDto", description = "아이디, 비밀번호"),
                    examples = @ExampleObject(
                            name = "정상 로그인 요청 예시",
                            summary = "정상 로그인 요청 예시",
                            value = """
                                    {
                                        "userLoginId" : "tester19",
                                        "userPassword" : "!a1234"
                                    }
                                    """
                    )
            )
    )
    public ResponseEntity<String> logIn(@RequestBody UserDto userDto);

    /// 로그아웃 - R
    @Operation(summary = "회원 로그아웃", description = "회원을 로그아웃 시킵니다.")
    @Parameter(name = "Authorization", required = true, description = "로그인 시 발급받은 토큰 입력")
    public boolean logOut(@RequestHeader("Authorization") String token);

    /// 회원 정보 확인 - R
    @Operation(summary = "회원 정보 확인", description = "회원의 정보를 확인합니다.")
    @Parameter(name = "Authorization", required = true, description = "로그인 시 발급받은 토큰 입력")
    public ResponseEntity<UserDto> userInformation(@RequestHeader("Authorization") String token);

    /// 이메일 수정 - P
    @Operation(summary = "회원 이메일 수정", description = "회원의 이메일을 수정합니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(type = "object", description = "변경할 이메일 정보를 담은 JSON 객체"),
                    examples = @ExampleObject(
                            name = "이메일 변경 요청 예시",
                            summary = "이메일 변경 요청 예시",
                            value = """
                                    {
                                        "email" : "tester19@gmail.com",
                                        "newEmail" : "tester1997@naver.com",
                                        "password" : "!a1234"
                                    }
                                    """
                    )
            )
    )
    @Parameter(name = "Authorization", required = true, description = "로그인 시 발급받은 토큰 입력")
    public ResponseEntity<Boolean> changeUserEmail(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> receive);

    /// 전화번호 수정 - P
    @Operation(summary = "회원 전화번호 수정", description = "회원의 전화번호를 수정합니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(type = "object", description = "변경할 전화번호 정보를 담은 JSON 객체"),
                    examples = @ExampleObject(
                            name = "전화번호 변경 요청 예시",
                            summary = "전화번호 변경 요청 예시",
                            value = """
                                    {
                                        "phone" : "010-1111-1111",
                                        "newPhone" : "010-2222-2222",
                                        "password" : "!a1234"
                                    }
                                    """
                    )
            )
    )
    @Parameter(name = "Authorization", required = true, description = "로그인 시 발급받은 토큰 입력")
    public ResponseEntity<Boolean> changeUserPhone(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> receive);

    /// 비밀번호 수정(내정보) - P
    @Operation(summary = "회원 내정보 비밀번호 수정", description = "내정보에서 회원의 비밀번호를 수정합니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(type = "object", description = "변경할 비밀번호 정보를 담은 JSON 객체"),
                    examples = @ExampleObject(
                            name = "비밀번호 변경 요청 예시",
                            summary = "비밀번호 변경 요청 예시",
                            value = """
                                    {
                                        "password" : "!a1234",
                                        "newPassword" : "@b4321"
                                    }
                                    """
                    )
            )
    )
    @Parameter(name = "Authorization", required = true, description = "로그인 시 발급받은 토큰 입력")
    public ResponseEntity<Boolean> changeUserPassword(@RequestHeader("Authorization") String token, @RequestBody Map<String ,String> receive);

    /// 회원 정보 수정 - U
    @Operation(summary = "회원 정보 수정 (사용X)", description = "현재 사용하지 않음")
    public boolean updateUser(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto);

    /// 비밀번호 수정(비밀번호 찾기) - U
    @Operation(summary = "회원 비밀번호 찾기 (사용 X)", description = "현재 사용하지 않음")
    public ResponseEntity<Boolean> updatePassword(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> passInfo);

    /// 회원 탈퇴 - D
    @Operation(summary = "회원 탈퇴", description = "회원을 소프트 탈퇴 시킵니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(type = "object", description = "'탈퇴' 문자와 비밀번호 정보를 담은 JSON 객체"),
                    examples = @ExampleObject(
                            name = "회원탈퇴 요청 예시",
                            summary = "회원탈퇴 요청 예시",
                            value = """
                                    {
                                        "key" : "탈퇴",
                                        "password" : "!a1234"
                                    }
                                    """
                    )

            )
    )
    @Parameter(name = "Authorization", required = true, description = "로그인 시 발급받은 토큰 입력")
    public ResponseEntity<Boolean> deleteUser(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> receive);

    /// 닉네임 중복 확인 - R
    @Operation(summary = "회원가입 닉네임 중복 확인", description = "회원가입시 중복되는 닉네임이 있는지 확인합니다.")
    @Parameter(name = "userNickname", required = true, description = "사용할 닉네임 작성")
    public boolean checkNickname(@RequestParam("userNickname") String userNickname);

    /// 아이디 중복 확인 - R
    @Operation(summary = "회원가입 아이디 중복 확인", description = "회원가입시 중복되는 아이디가 있는지 확인합니다.")
    @Parameter(name = "userLoginId", required = true, description = "사용할 아이디 작성")
    public boolean checkLoginId(@RequestParam("userLoginId") String userLoginId);

    /// 전화번호 중복 확인 - R
    @Operation(summary = "회원가입 전화번호 중복 확인", description = "회원가입시 중복되는 전화번호가 있는지 확인합니다.")
    @Parameter(name = "userPhone", required = true, description = "회원의 전화번호 작성 (010-XXXX-XXXX)")
    public boolean checkPhone(@RequestParam("userPhone") String userPhone);

    /// 로그인 확인 - R
    @Operation(summary = "회원 로그인 상태 확인", description = "회원이 로그인 상태인지 확인합니다.")
    @Parameter(name = "Authorization", required = true, description = "로그인 시 발급받은 토큰 입력")
    public boolean checkLoginState(@RequestHeader("Authorization") String token);

    /// 인증번호 발송 - R
    @Operation(summary = "인증번호 발송", description = "아이디/비밀번호 찾기를 위한 인증번호를 발송합니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = VerificationDto.class),
                    examples = @ExampleObject(
                            name = "인증번호 발송 요청 예시",
                            summary = "인증번호 발송 요청 예시",
                            value = """
                                    {
                                        "userName" : "홍길동",
                                        "userPhone" : "010-2222-2222"
                                    }
                                    """
                    )
            )
    )
    public ResponseEntity<String> sendCodeNumber(@RequestBody VerificationDto verificationDto);

    /// 인증번호 확인 - R
    @Operation(summary = "인증번호 확인", description = "발급된 인증번호를 서버에서 인증합니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = VerificationDto.class),
                    examples = @ExampleObject(
                            name = "인증번호 확인 요청 예시",
                            summary = "인증번호 확인 요청 예시",
                            value = """
                                    {
                                        "userName" : "홍길동",
                                        "userPhone" : "010-2222-2222",
                                        "verificationCode" : "8521"
                                    }
                                    """
                    )
            )
    )
    public ResponseEntity<Boolean> checkCodeNumber(@RequestBody VerificationDto verificationDto);

    /// 아이디 및 비밀번호 찾기 - R
    @Operation(summary = "회원 아이디 및 비밀번호 찾기", description = "회원의 아이디 또는 비밀번호를 찾습니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = VerificationDto.class),
                    examples = {
                            @ExampleObject(
                                    name = "회원 아이디 찾기 요청 예시",
                                    summary = "회원 아이디 찾기 요청 예시",
                                    value = """
                                    {
                                        "userName" : "홍길동",
                                        "userPhone" : "010-2222-2222",
                                        "verificationCode" : "8521"
                                    }
                                    """
                            ),
                            @ExampleObject(
                                    name = "회원 비밀번호 찾기 요청 예시",
                                    summary = "회원 비밀번호 찾기 요청 예시",
                                    value = """
                                    {
                                        "userLoginId" : "tester19",
                                        "userName" : "홍길동",
                                        "userPhone" : "010-2222-2222",
                                        "verificationCode" : "8521"
                                    }
                                    """
                            )
                    }
            )
    )
    public ResponseEntity<String> findByUserLoginIdOrUserPassword(@RequestBody VerificationDto verificationDto);

    /// 비밀번호 재설정(리셋) - U
    @Operation(summary = "회원 비밀번호 찾기 비밀번호 재설정", description = "비밀번호를 찾게 될 경우 비밀번호를 재설정합니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(type = "HashMap<String, String>", description = "변경할 비밀번호를 담은 JSON 객체"),
                    examples = @ExampleObject(
                            name = "비밀번호 재설정 요청 예시",
                            summary = "비밀번호 재설정 요청 예시",
                            value = """
                                    {
                                        "userLoginId" : "tester19",
                                        "userName" : "홍길동",
                                        "userPhone" : "010-2222-2222",
                                        "verificationCode" : "8521",
                                        "newPassword" : "@b4321"
                                    }
                                    """
                    )
            )
    )
    @Parameter(name = "token", required = true, description = "비밀번호 찾기 페이지에서 발급받은 토큰 입력")
    public ResponseEntity<Boolean> resetPassword(@RequestBody HashMap<String, String> info, @PathVariable("token") String ResetToken);
}
