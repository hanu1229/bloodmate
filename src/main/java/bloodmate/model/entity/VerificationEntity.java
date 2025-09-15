package bloodmate.model.entity;

import bloodmate.model.dto.VerificationDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "verifications")
@EntityListeners(AuditingEntityListener.class)
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class VerificationEntity {

    /// 인증번호 PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "verification_id")
    private int verificationId;
    /// 이름
    @Column(name = "user_name", nullable = false, length = 30)
    private String userName;
    /// 전화번호
    @Column(name = "user_phone", nullable = false, length = 13)
    private String userPhone;
    /// 아이디
    @Column(name = "user_login_id", length = 12)
    private String userLoginId;
    /// 인증번호
    @Column(name = "verification_code", nullable = false, length = 4)
    private String verificationCode;
    /// 생성일
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    /// 비밀번호 리셋 토큰
    @Column(name = "reset_token", length = 36)
    private String resetToken;
    /// 인증여부
    @Builder.Default
    @Column(name = "is_verification")
    @ColumnDefault("0")
    private int isVerification = 0;
    /// 사용여부
    @Builder.Default
    @Column(name = "is_used")
    @ColumnDefault("0")
    private int isUsed = 0;

    /// Entity -> Dto
    public VerificationDto toDto() {
        return VerificationDto.builder()
                .verificationId(this.verificationId).userName(this.userName).userPhone(this.userPhone).userLoginId(this.userLoginId).resetToken(this.resetToken)
                .verificationCode(this.verificationCode).createdAt(this.createdAt).isVerification(this.isVerification).isUsed(this.isUsed)
                .build();
    }

}
