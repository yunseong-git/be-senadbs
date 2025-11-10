import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { BattleLog, BattleLogDocument } from './schemas/battle-log.schema';
import { CreateBattleLogDto } from './dto/create-battle-log.dto';
import { QueryBattleLogDto } from './dto/query-battle-log.dto';
import { UpdateBattleLogDto } from './dto/update-battle-log.dto';

@Injectable()
export class BattleLogService {
  constructor(@InjectModel(BattleLog.name) private readonly battleLogModel: Model<BattleLogDocument>) { }

  async create(dto: CreateBattleLogDto, userId: Types.ObjectId) {
    const newSet = new this.battleLogModel({
      ...dto,
      userId: userId,
    });
    return newSet.save();
  }

  async findAll(dto: QueryBattleLogDto) {
    const { sortBy, page = '1', limit = '20', heroId } = dto;

    // 기본 필터: 삭제되지 않은 항목
    const filter: FilterQuery<BattleLogDocument> = {};

    // 영웅 ID 필터링 (heroId가 쿼리로 들어온 경우)
    if (heroId) {
      filter['deck.heroes'] = new Types.ObjectId(heroId);
    }

    // 정렬 (upvotes: 추천순, latest: 최신순)
    const sort: Record<string, 1 | -1> = {};
    if (sortBy === 'upvotes') {
      sort.upvoteCount = -1;
    } else {
      sort.createdAt = -1;
    }

    // 페이지네이션
    const nLimit = parseInt(limit, 10);
    const nPage = parseInt(page, 10);
    const skip = (nPage - 1) * nLimit;

    // 데이터와 총 카운트를 병렬로 조회
    const [data, total] = await Promise.all([
      this.battleLogModel.find(filter).sort(sort).skip(skip).limit(nLimit).lean().exec(),
      this.battleLogModel.countDocuments(filter).exec(),
    ]);

    return { data, total, page: nPage, limit: nLimit };

  }

  async findOne(id: string) {
    const set = await this.battleLogModel.findOne({ _id: id }).lean().exec();

    if (!set) {
      throw new NotFoundException(`BattleLog with ID "${id}" not found.`);
    }

    return set;
  }

  async findMyGuides(userId: Types.ObjectId) {
    return await this.battleLogModel.find({ userId: userId }).sort({ createdAt: -1 }).lean().exec();
  }

  async update(set: BattleLogDocument, updateDto: UpdateBattleLogDto) {
    Object.assign(set, updateDto);
    return await set.save();
  }

  async remove(set: BattleLogDocument) {
    set.isDeleted = true;
    await set.save();
  }

  async getCounterDeck() {

  }

  async getBestDefenseDecks() {

  }
}
