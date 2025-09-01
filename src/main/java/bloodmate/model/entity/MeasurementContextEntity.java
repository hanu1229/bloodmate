package bloodmate.model.entity;

import bloodmate.model.dto.MeasurementContextDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "measurement_context")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class MeasurementContextEntity extends BaseTime {

    /// 측정 상황 번호
    @Id
    @Column(name = "measurement_context_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mcId;
    /// 측정 상황 코드
    @Column(name = "measurement_context_code", length = 50, nullable = false, unique = true)
    private String mcCode;
    /// 측정 상황 정렬
    @Column(name = "order_number", nullable = false)
    private int orderNumber;
    /// 측정 상황 사용 유무
    @Column(name = "is_active")
    @ColumnDefault("1")
    private int isActive;

    /// Entity -> Dto
    public MeasurementContextDto toDto() {
        return MeasurementContextDto.builder()
                .mcId(this.mcId).mcCode(this.mcCode).orderNumber(this.orderNumber).isActive(this.isActive)
                .createdAt(this.getCreatedAt()).updatedAt(this.getUpdatedAt())
                .build();
    }


}
