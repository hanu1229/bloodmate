package bloodmate.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "board_category")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class BoardCategoryEntity {

    /// 카테고리 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_category_id")
    private int boardCategoryId;
    /// 카테고리 제목
    @Column(name = "board_category_title", nullable = false, unique = true, length = 16)
    private String boardCategoryTitle;

}
