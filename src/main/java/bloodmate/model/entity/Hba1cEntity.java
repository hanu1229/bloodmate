package bloodmate.model.entity;

import bloodmate.model.dto.Hba1cDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_hba1c")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class Hba1cEntity extends BaseTime {

    // 당화혈색소 수치 번호(PK)
    @Id
    @Column(name = "user_hba1c_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userHba1cId;
    // 당화혈색소 수치 | precision ==> 전체 자리수 정의(소수점 포함), scale ==> 소수점 자리수
    @Column(name = "user_hba1c_value", precision = 3, scale = 1, nullable = false)
    private BigDecimal userHba1cValue;
    // 측정일
    @Column(name = "measured_at", nullable = false)
    private LocalDateTime measuredAt;
    // 회원번호(FK)
    @ManyToOne
    @JoinColumn(name = "user_id")
    // FK 컬럼 이름은 DB 기준
    private UserEntity userEntity;

    /// Entity --> Dto
    public Hba1cDto toDto() {
        return Hba1cDto.builder()
                .userHba1cId(this.userHba1cId).userHba1cValue(this.userHba1cValue).measuredAt(this.measuredAt)
                .createdAt(this.getCreatedAt()).updatedAt(this.getUpdatedAt()).userId(this.userEntity.getUserId())
                .build();
    }

}
