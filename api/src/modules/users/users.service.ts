import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import pick from 'lodash.pick';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { SignUpDto } from '@/modules/auth/auth.dto';
import {
  UpdateAvatarDto,
  UpdateSettingsDto,
  UserMetadataDto,
} from './users.dto';
import { StorageService } from '@/modules/storage/storage.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private storageService: StorageService,
  ) {}

  async createUser(dto: SignUpDto) {
    const possibleExistedUser = await this.getByEmail(dto.email);

    if (possibleExistedUser) {
      throw new UnprocessableEntityException('User already exist');
    }

    const user = new User();

    user.email = dto.email;
    user.password = await bcrypt.hash(dto.password, 8);
    user.first_name = dto.first_name;
    user.last_name = dto.last_name;

    return await this.usersRepository.save(user);
  }

  async getById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async getMany(ids: number[]) {
    return await this.usersRepository.find({ where: { id: In(ids) } });
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async comparePasswords(source: string, password: string) {
    return await bcrypt.compare(source, password);
  }

  async verifyEmail(id: number) {
    await this.usersRepository.update({ id }, { verified_email: true });
  }

  async getEditableSettings(id: number) {
    return pick(await this.usersRepository.findOneBy({ id }), [
      'first_name',
      'last_name',
      'email',
    ]);
  }

  async updateUser(id: number, payload: UpdateSettingsDto) {
    delete payload.repeat_password;

    const processedPayload = { ...payload };
    if (payload.password) {
      processedPayload.password = await bcrypt.hash(payload.password, 8);
    }

    await this.usersRepository.update({ id }, processedPayload);
  }

  async updateAvatar(id: number, payload: UpdateAvatarDto) {
    await this.usersRepository.update(
      { id },
      { avatar: await this.storageService.putFile(payload.avatar, 'images') },
    );
  }

  async getUserMetadata(id: number): Promise<UserMetadataDto> {
    const user = await this.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return pick(user, ['avatar', 'id', 'first_name', 'last_name']);
  }
}
