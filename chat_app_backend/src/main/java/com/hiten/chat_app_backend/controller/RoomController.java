package com.hiten.chat_app_backend.controller;

import com.hiten.chat_app_backend.entities.Message;
import com.hiten.chat_app_backend.entities.Room;
import com.hiten.chat_app_backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:3000")
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }


//    Create Room
    @PostMapping()
    public ResponseEntity<?> createRoom(@RequestBody String roomId){
        return roomService.createRoom(roomId);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId){
        return roomService.findByRoomId(roomId);

    }

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String roomId,
            @RequestParam(value="page",defaultValue = "0",required = false) int page,
            @RequestParam(value = "size",defaultValue = "20",required = false)int size){

        return roomService.getMessages(roomId,page,size);

    }

}
