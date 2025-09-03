package bloodmate.model.entity;

import bloodmate.model.dto.bloodpressure.BloodPressureResponseDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_blood_pressure")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class BloodPressureEntity extends BaseTime {

    /// 혈압 수치 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blood_pressure_id")
    private int bloodPressureId;
    /// 혈압 수축 수치
    @Column(name = "blood_pressure_systolic", nullable = false)
    private int bloodPressureSystolic;
    /// 혈압 이완 수치
    @Column(name = "blood_pressure_diastolic", nullable = false)
    private int bloodPressureDiastolic;
    /// 맥박
    @Column(name = "blood_pressure_pulse", nullable = false)
    private int bloodPressurePulse;
    /// 측정일
    @Column(name = "measured_at", nullable = false)
    private LocalDateTime measuredAt;
    /// 측정 상황 번호 FK
    @ManyToOne
    @JoinColumn(name = "measurement_context_id")
    private MeasurementContextEntity measurementContextEntity;
    ///  회원 번호 FK
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    /// Entity -> Dto
    public BloodPressureResponseDto toDto() {
        return BloodPressureResponseDto.builder()
                .bloodPressureId(this.bloodPressureId).bloodPressureSystolic(this.bloodPressureSystolic).bloodPressureDiastolic(this.bloodPressureDiastolic)
                .bloodPressurePulse(this.bloodPressurePulse).measuredAt(this.measuredAt)
                .measurementContextCode(this.measurementContextEntity.getMcCode()).userId(this.userEntity.getUserId())
                .createdAt(this.getCreatedAt()).updatedAt(this.getUpdatedAt())
                .build();
    }

}
