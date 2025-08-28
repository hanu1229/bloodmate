package bloodmate.controller;

import bloodmate.model.dto.Hba1cDto;
import bloodmate.service.Hba1cService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/blood/hba1c")
public class Hba1cController {

    private final Hba1cService hba1cService;

    /// 당화혈색소 저장 - C
    @PostMapping("")
    public boolean createHba1c(@RequestHeader("Authorization") String token, @RequestBody Hba1cDto hba1cDto) {
        System.out.println(">> Hba1cController.createHba1c start");
        System.out.println(">> token = " + token);
        System.out.println(">> hba1cDto = " + hba1cDto);
        boolean result = hba1cService.createHba1c(token, hba1cDto);
        System.out.println(">> Hba1cController.createHba1c end\n");
        return result;
    }
    /// 당화혈색소 전체 불러오기 - R
    /// 당화혈색소 수정하기 - U
    /// 당화혈색소 삭제하기 - D

}
