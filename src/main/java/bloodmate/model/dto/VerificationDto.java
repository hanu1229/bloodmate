package bloodmate.model.dto;

import bloodmate.model.entity.VerificationEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class VerificationDto {

    /// 인증번호 PK
    private int verificationId;
    /// 이름
    private String userName;
    /// 전화번호
    private String userPhone;
    /// 아이디
    private String userLoginId;
    /// 인증번호
    private String verificationCode;
    /// 생성일
    private LocalDateTime createdAt;
    /// 비밀번호 리셋 토큰
    private String resetToken;
    /// 인증여부
    private int isVerification;
    /// 사용여부
    private int isUsed;

    /// Dto -> Entity
    public VerificationEntity toEntity() {
        return VerificationEntity.builder()
                .verificationId(this.verificationId).userName(this.userName).userPhone(this.userPhone).userLoginId(this.userLoginId).resetToken(this.resetToken)
                .verificationCode(this.verificationCode).createdAt(this.createdAt).isVerification(this.isVerification).isUsed(this.isUsed)
                .build();
    }

}
