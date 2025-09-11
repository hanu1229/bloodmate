package bloodmate.model.entity;

import bloodmate.model.dto.UserDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class UserEntity extends BaseTime {

    // 회원 번호 (PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
    // 아이디
    @Column(name = "user_login_id", nullable = false, length = 12, unique = true)
    private String userLoginId;
    // 비밀번호
    @Column(name = "user_password", nullable = false, length = 15)
    private String userPassword;
    // 닉네임
    @Column(name = "user_nickname", nullable = false, length = 30, unique = true)
    private String userNickname;
    // 이름
    @Column(name = "user_name", nullable = false, length = 30)
    private String userName;
    // 주소 length default 255
    @Column(name = "user_address", nullable = false)
    private String userAddress;
    // 전화번호
    @Column(name = "user_phone", nullable = false, length = 13, unique = true)
    private String userPhone;
    // 이메일 length default 255
    @Column(name = "user_email", nullable = false)
    private String userEmail;
    // 회원 역할
    @Column(name = "user_role", nullable = false)
    @ColumnDefault("0")
    private int userRole;
    // 회원 상태
    @Column(name = "user_state", nullable = false)
    @ColumnDefault("1")
    private int userState;

    /// Entity --> Dto
    public UserDto toDto() {
        return UserDto.builder()
                .userId(this.userId).userLoginId(this.userLoginId).userPassword(this.userPassword).userNickname(this.userNickname)
                .userName(this.userName).userAddress(this.userAddress).userPhone(this.userPhone).userEmail(this.userEmail)
                .userRole(this.userRole).userState(this.userState)
                .createdAt(getCreatedAt()).updatedAt(getUpdatedAt())
                .build();
    }

}
