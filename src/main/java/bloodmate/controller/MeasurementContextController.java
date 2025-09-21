package bloodmate.controller;

import bloodmate.model.dto.MeasurementContextDto;
import bloodmate.service.MeasurementContextService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/blood/measurement")
public class MeasurementContextController {

    private final MeasurementContextService mcService;

    /// 측정 상황 불러오기 - R
    @GetMapping()
    public ResponseEntity<List<MeasurementContextDto>> findAll() {
        System.out.println(">> MeasurementContextController.findAll start");
        ResponseEntity<List<MeasurementContextDto>> result = mcService.findAll();
        System.out.println(">> MeasurementContextController.findAll end\n");
        return result;
    }

}
