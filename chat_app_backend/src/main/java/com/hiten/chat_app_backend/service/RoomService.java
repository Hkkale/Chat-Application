package com.hiten.chat_app_backend.service;

import com.hiten.chat_app_backend.entities.Message;
import com.hiten.chat_app_backend.entities.Room;
import com.hiten.chat_app_backend.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public ResponseEntity<?> createRoom(String roomId) {
        if(roomRepository.findByRoomId(roomId)!=null){
            return  ResponseEntity.badRequest().body("room already exists!");
        }
        Room room = new Room();
        room.setRoomId(roomId);
        roomRepository.save(room);

        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }


    public ResponseEntity<?> findByRoomId(String roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        System.out.println(room);
        if(room==null){
            return ResponseEntity.badRequest().body("Room Not Found!");

        }
        return  ResponseEntity.ok(room);
    }

    public ResponseEntity<List<Message>> getMessages(String roomId, int page, int size) {
        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) {
            return ResponseEntity.badRequest().build()
                    ;
        }
        //get messages :
        //pagination
        List<Message> messages = room.getMessages();
        int start = Math.max(0, messages.size() - (page + 1) * size);
        int end = Math.min(messages.size(), start + size);
        List<Message> paginatedMessages = messages.subList(start, end);
        return ResponseEntity.ok(paginatedMessages);

    }
}
