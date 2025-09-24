package bloodmate.model.dto;

import bloodmate.model.entity.Hba1cEntity;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class Hba1cDto {

    ///당화혈색소 수치 번호(PK)
    private int hba1cId;
    /// 당화혈색소 수치
    private BigDecimal hba1cValue;
    /// 측정일
    private LocalDateTime measuredAt;
    ///  검사 예정일
    private LocalDateTime nextTestAt;
    /// 작성일
    private LocalDateTime createdAt;
    /// 수정일
    private LocalDateTime updatedAt;
    /// 회원번호(FK)
    private int userId;

    /// Dto --> Entity
    public Hba1cEntity toEntity() {
        return Hba1cEntity.builder()
                .hba1cId(this.hba1cId).hba1cValue(this.hba1cValue).measuredAt(this.measuredAt).nextTextAt(this.nextTestAt)
                .build();
    }

}
