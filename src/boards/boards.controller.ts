import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
// validation 유효성체크, transform 형변환 pipe 모듈 설치
// npm install class-validator class-transformer--save
// pipe Doc 참조 URL: https://github.com/typestack/class-validator#manual-validation

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    //     // service 에서 처리할 게시판 정보들을 클라이언트에서 받는 곳
    //     // 클라이언트에서 request한 것을 가져와야 한다.
    //     // express (안배워서 모르겠는데 일단)에서는 req(request) res(response)변수를 사용한댄다.
    //     // 근데 nestJS 는 @Body() body로 가져온댄다.
    //     // @Body() '변수명' < 일케하면 reqest한거 다 변수에 집어넣는거고 (맞는지몰라)
    //     // @Body('title') title  < 일케하면 title이란 변수에 request 중에서 title값 만 넣는거다
    // @Body('title') title: string,
    // @Body('description') description: string

    @Body() createBoardDto: CreateBoardDto,
  ): Board {
    return this.boardsService.createBoard(createBoardDto);
  }
  @Get(':id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
