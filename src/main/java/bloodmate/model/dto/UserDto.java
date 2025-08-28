package bloodmate.model.dto;

import bloodmate.model.entity.UserEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class UserDto {

    // 회원 번호
    private int userId;
    // 아이디
    private String userLoginId;
    // 비밀번호
    private String userPassword;
    // 닉네임
    private String userNickname;
    // 이름
    private String userName;
    // 주소
    private String userAddress;
    // 전화번호
    private String userPhone;
    // 이메일
    private String userEmail;
    // 가입일
    private LocalDateTime createdAt;
    // 정보 수정일
    private LocalDateTime updatedAt;
    // 회원 역할
    private int userRole;
    // 회원 상태
    private int userState;

    /// Dto --> Entity
    public UserEntity toEntity() {
        return UserEntity.builder()
                .userId(this.userId).userLoginId(this.userLoginId).userPassword(this.userPassword).userNickname(this.userNickname).userName(this.userName)
                .userAddress(this.userAddress).userPhone(this.userPhone).userEmail(this.userEmail)
                .userRole(this.userRole).userState(this.userState)
                .build();
    }

}
