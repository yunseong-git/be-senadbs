import { ForbiddenException, GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { DefenseSet, DefenseSetDocument } from './schemas/defense-set.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDefenseSetDto } from './dto/create-defense-set.dto';
import { UpdateDefenseSetDto } from './dto/update-defense-set.dto';
import { queryDefenseSetDto } from './dto/query-defense-set.dto';

@Injectable()
export class DefenseSetService {
  constructor(@InjectModel(DefenseSet.name) private readonly defenseSetModel: Model<DefenseSetDocument>) { }

  async create(dto: CreateDefenseSetDto, userId: Types.ObjectId) {
    const newSet = new this.defenseSetModel({
      deck: dto.deck,
      setting: dto.setting,
      comment: dto.comment,
      userId: userId,
    });
    return newSet.save();
  }

  async findAll(dto: queryDefenseSetDto) {
    const { sortBy, page = '1', limit = '20', heroId } = dto;

    // 기본 필터: 삭제되지 않은 항목
    const filter: FilterQuery<DefenseSetDocument> = {};

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
      this.defenseSetModel.find(filter).sort(sort).skip(skip).limit(nLimit).lean().exec(),
      this.defenseSetModel.countDocuments(filter).exec(),
    ]);

    return { data, total, page: nPage, limit: nLimit };

  }

  async findOne(id: string) {
    const set = await this.defenseSetModel.findOne({ _id: id }).lean().exec();

    if (!set) {
      throw new NotFoundException(`DefenseSet with ID "${id}" not found.`);
    }

    return set;
  }

  async findMyGuides(userId: Types.ObjectId) {
    return await this.defenseSetModel.find({ userId: userId }).sort({ createdAt: -1 }).lean().exec();
  }

  async update(set: DefenseSetDocument, updateDto: UpdateDefenseSetDto) {
    Object.assign(set, updateDto);
    return await set.save();
  }

  async remove(set: DefenseSetDocument) {
    set.isDeleted = true;
    await set.save();
  }
}
