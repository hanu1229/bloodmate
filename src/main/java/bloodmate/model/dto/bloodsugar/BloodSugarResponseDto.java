package bloodmate.model.dto.bloodsugar;

import bloodmate.model.entity.BloodSugarEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class BloodSugarResponseDto {

    /// 혈당 수치 번호
    private int bloodSugarId;
    /// 혈당 수치
    private int bloodSugarValue;
    /// 측정일
    private LocalDateTime measuredAt;
    /// 작성일
    private LocalDateTime createdAt;
    /// 수정일
    private LocalDateTime updatedAt;
    /// 측정 상황 번호 FK
    private String measurementContextCode;
    /// 측정 상황 라벨
    private String measurementContextLabel;
    /// 회원 번호 FK
    private int userId;

    /// Dto -> Entity
    public BloodSugarEntity toEntity() {
        return BloodSugarEntity.builder()
                .bloodSugarId(this.bloodSugarId).bloodSugarValue(this.bloodSugarValue).measuredAt(this.measuredAt)
                .build();
    }

}
