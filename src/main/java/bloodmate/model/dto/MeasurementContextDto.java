package bloodmate.model.dto;

import bloodmate.model.entity.MeasurementContextEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class MeasurementContextDto {

    // 측정 상황 번호
    private int mcId;
    // 측정 상황 코드
    private String mcCode;
    // 측정 상황 정렬
    private int orderNumber;
    // 측정 상황 사용 유무
    private int isActive;
    // 작성일
    private LocalDateTime createdAt;
    // 수정일
    private LocalDateTime updatedAt;

    /// Dto -> Entity
    public MeasurementContextEntity toEntity() {
        return MeasurementContextEntity.builder()
                .mcId(this.mcId).mcCode(this.mcCode).orderNumber(this.orderNumber).isActive(this.isActive)
                .build();
    }

}
