import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDTO) {
    //const title = createBoardDto.title;
    // const { title } = createBoardDto.title;
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      //   title: title,
      //   description: description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }
}
