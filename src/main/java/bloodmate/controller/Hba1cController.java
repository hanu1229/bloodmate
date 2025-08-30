package bloodmate.controller;

import bloodmate.model.dto.Hba1cDto;
import bloodmate.service.Hba1cService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("")
    public List<Hba1cDto> findAllHba1c(@RequestHeader("Authorization") String token) {
        System.out.println(">> Hba1cController.findAllHba1c start");
        System.out.println(">> token = " + token);
        List<Hba1cDto> result = hba1cService.findAllHba1c(token);
        System.out.println(">> Hba1cController.findAllHba1c end\n");
        return result;
    }
    /// 당화혈색소 수정하기 - U
    @PutMapping("/{hba1cId}")
    public boolean updateHba1c(@RequestHeader("Authorization") String token, @RequestBody Hba1cDto hba1cDto, @PathVariable("hba1cId") int hba1cId) {
        System.out.println(">> Hba1cController.updateHba1c start");
        System.out.println(">> token = " + token);
        System.out.println(">> hba1cDto = " + hba1cDto);
        boolean result = hba1cService.updateHba1c(token, hba1cDto, hba1cId);
        System.out.println(">> Hba1cController.updateHba1c end\n");
        return result;
    }
    /// 당화혈색소 삭제하기 - D
    @DeleteMapping("/{hba1cId}")
    public boolean deleteHba1c(@RequestHeader("Authorization") String token, @PathVariable("hba1cId") int hba1cId) {
        System.out.println(">> Hba1cController.deleteHba1c start");
        System.out.println(">> token = " + token);
        boolean result = hba1cService.deleteHba1c(token, hba1cId);
        System.out.println(">> Hba1cController.deleteHba1c end\n");
        return result;
    }

}
