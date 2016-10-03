package kr.admin.speech.controller;

import java.io.File;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import kr.spring.speech.domain.SpeechCommand;
import kr.spring.speech.service.SpeechService;
import kr.spring.util.FileUtil;


@Controller
@SessionAttributes("command")
public class SpeechWriteController {
	private Logger log = Logger.getLogger(this.getClass());
	
	@Resource
	private SpeechService speechService;
	
	@RequestMapping(value="/admin/speech/write.do",method=RequestMethod.GET)
	public String form(HttpSession session,Model model){
		String mem_id = (String)session.getAttribute("userId");
		
		SpeechCommand command = new SpeechCommand();
		command.setMem_id(mem_id);
		
		model.addAttribute("command", command);
		
		return "speechWrite";
	}
	@RequestMapping(value="/admin/speech/write.do",method=RequestMethod.POST)
	public String submit(@ModelAttribute("command") @Valid SpeechCommand speechCommand, BindingResult result,SessionStatus status) throws Exception{
		if(log.isDebugEnabled()){
			log.debug("speechCommand : " + speechCommand);
		}
		
		if(result.hasErrors()){
			return "speechWrite";
		}
		
		String newName = "";
		if(!speechCommand.getUpload().isEmpty()){
			newName = FileUtil.rename(speechCommand.getUpload().getOriginalFilename());
			speechCommand.setSpeech_filename(newName);
		}
		
		//���� ���
		speechService.insert(speechCommand);
		status.setComplete();
		
		if(!speechCommand.getUpload().isEmpty()){
			File file = new File(FileUtil.UPLOAD_PATH + "/" + newName);
			speechCommand.getUpload().transferTo(file);
		}
		
		return "redirect:/admin/speech/list.do";
	}
}
