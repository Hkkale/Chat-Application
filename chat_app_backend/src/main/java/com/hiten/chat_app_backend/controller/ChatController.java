package com.hiten.chat_app_backend.controller;

import com.hiten.chat_app_backend.entities.Message;
import com.hiten.chat_app_backend.entities.Room;
import com.hiten.chat_app_backend.playload.MessageRequest;
import com.hiten.chat_app_backend.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    private RoomRepository roomRepository;

    @Autowired
    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;

    }

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId ,
            @RequestBody MessageRequest request
    )  {

        Room room = roomRepository.findByRoomId(request.getRoomId());

        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimeStamp(LocalDateTime.now());

        if(room != null){
            room.getMessages().add(message);
            roomRepository.save(room);
        }
        else{
            throw new RuntimeException("Room not Found");
        }

        return message;

    }


}
