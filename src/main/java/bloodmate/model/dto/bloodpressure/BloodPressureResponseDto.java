package bloodmate.model.dto.bloodpressure;

import bloodmate.model.entity.BloodPressureEntity;
import bloodmate.model.entity.MeasurementContextEntity;
import bloodmate.model.entity.UserEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class BloodPressureResponseDto {

    /// 혈압 수치 번호
    private int bloodPressureId;
    /// 혈압 수축 수치
    private int bloodPressureSystolic;
    /// 혈압 이완 수치
    private int bloodPressureDiastolic;
    /// 맥박
    private int bloodPressurePulse;
    /// 측정일
    private LocalDateTime measuredAt;
    /// 측정 상황 번호 FK
    private int measurementContextId;
    /// 측정 상황 코드
    private String measurementContextCode;
    /// 측정 상황 라벨
    private String measurementContextLabel;
    ///  회원 번호 FK
    private int userId;
    /// 작성일
    private LocalDateTime createdAt;
    /// 수정일
    private LocalDateTime updatedAt;

    /// Dto -> Entity
    public BloodPressureEntity toEntity() {
        return BloodPressureEntity.builder()
                .bloodPressureId(this.bloodPressureId).bloodPressureSystolic(this.bloodPressureSystolic).bloodPressureDiastolic(this.bloodPressureDiastolic)
                .bloodPressurePulse(this.bloodPressurePulse).measuredAt(this.measuredAt)
                .build();
    }

}
