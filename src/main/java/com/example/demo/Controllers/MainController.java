package com.example.demo.Controllers;


import com.example.demo.Model.Paint;
import com.example.demo.Repository.PaintRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
public class MainController {

    @Autowired
    private PaintRepository paintRepo;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Main page");
        return "home";
    }
    @RequestMapping(value = "/sendChange", method = RequestMethod.POST)
    public @ResponseBody HttpStatus setChanges(@RequestParam String text) {
        //Добавить нашу строку в базу данных
        Paint paint = new Paint();
        //paint = paintRepo.findById(1);
        paint.setId((long) 1);
        paint.setText(text);
        paintRepo.save(paint);
        return HttpStatus.OK;
    }

    @RequestMapping(value = "/getChange", method = RequestMethod.GET)
    @ResponseBody
    public String getChanges(@RequestParam("text") String text) {
        return paintRepo.findById(1).getText().toString();
    }

}
