package bloodmate.model.entity;

import bloodmate.model.dto.bloodsugar.BloodSugarRequestDto;
import bloodmate.model.dto.bloodsugar.BloodSugarResponseDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_blood_sugar")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class BloodSugarEntity extends BaseTime {

    /// 혈당 수치 번호
    @Id
    @Column(name = "blood_sugar_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bloodSugarId;
    /// 혈당 수치
    @Column(name = "blood_sugar_value", nullable = false)
    private int bloodSugarValue;
    /// 측정일
    @Column(name = "measured_at", nullable = false)
    private LocalDateTime measuredAt;
    /// 측정 상황 번호 FK
    @ManyToOne
    @JoinColumn(name = "measurement_context_id")
    private MeasurementContextEntity measurementContextEntity;
    /// 회원 번호 FK
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    /// Entity -> Dto
    public BloodSugarResponseDto toDto() {
        return BloodSugarResponseDto.builder()
                .bloodSugarId(this.bloodSugarId).bloodSugarValue(this.bloodSugarValue).measuredAt(this.measuredAt)
                .measurementContextCode(this.getMeasurementContextEntity().getMcCode()).userId(getUserEntity().getUserId())
                .createdAt(this.getCreatedAt()).updatedAt(this.getUpdatedAt())
                .build();
    }

}
