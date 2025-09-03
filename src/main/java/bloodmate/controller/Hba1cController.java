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

    /// 당화혈색소 정보 저장 - C
    @PostMapping("")
    public boolean create(@RequestHeader("Authorization") String token, @RequestBody Hba1cDto hba1cDto) {
        System.out.println(">> Hba1cController.create start");
        System.out.println(">> token = " + token);
        System.out.println(">> hba1cDto = " + hba1cDto);
        boolean result = hba1cService.create(token, hba1cDto);
        System.out.println(">> Hba1cController.create end\n");
        return result;
    }

    /// 당화혈색소 정보 전체 불러오기 - R
    @GetMapping("")
    public List<Hba1cDto> findAll(@RequestHeader("Authorization") String token) {
        System.out.println(">> Hba1cController.findAll start");
        System.out.println(">> token = " + token);
        List<Hba1cDto> result = hba1cService.findAll(token);
        System.out.println(">> Hba1cController.findAll end\n");
        return result;
    }

    /// 당화혈색소 정보 수정하기 - U
    @PutMapping("/{hba1cId}")
    public boolean update(@RequestHeader("Authorization") String token, @RequestBody Hba1cDto hba1cDto, @PathVariable("hba1cId") int hba1cId) {
        System.out.println(">> Hba1cController.update start");
        System.out.println(">> token = " + token);
        System.out.println(">> hba1cDto = " + hba1cDto);
        boolean result = hba1cService.update(token, hba1cDto, hba1cId);
        System.out.println(">> Hba1cController.update end\n");
        return result;
    }

    /// 당화혈색소 정보 삭제하기 - D
    @DeleteMapping("/{hba1cId}")
    public boolean delete(@RequestHeader("Authorization") String token, @PathVariable("hba1cId") int hba1cId) {
        System.out.println(">> Hba1cController.delete start");
        System.out.println(">> token = " + token);
        boolean result = hba1cService.delete(token, hba1cId);
        System.out.println(">> Hba1cController.delete end\n");
        return result;
    }

}
