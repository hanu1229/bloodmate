package bloodmate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "board_post")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class BoardEntity extends BaseTime {

    /// 게시물 번호 PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_post_id")
    private int boardPostId;
    /// 게시물 제목
    @Column(name = "board_post_title", nullable = false, length = 60)
    private String boardPostTitle;
    /// 게시물 내용
    @Column(name = "board_post_content", nullable = false)
    private String BoardPostContent;
    /// 게시물 조회수
    @Column(name = "board_post_view")
    @ColumnDefault("0")
    private int boardPostView;
    /// 게시물 상태 --> 0 : 삭제, 1 : 정상
    @Column(name = "board_post_state")
    @ColumnDefault("1")
    private int boardPostState;
    /// 게시물 작성자 번호 FK
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
    /// 카테고리 번호 FK
    @ManyToOne
    @JoinColumn(name = "board_category_id")
    private BoardCategoryEntity boardCategoryEntity;

}
