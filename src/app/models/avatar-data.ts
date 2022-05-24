export class AvatarData {
  name?: string;
  photo?: string;
  position?: string;
  department?: string;
  fio?: string;
  nameRole?: string;

  constructor(options?: Partial<AvatarData>) {
    this.name = options?.name;
    this.photo = options?.photo;
    this.position = options?.position;
    this.department = options?.department;
    this.fio = options?.fio;
    this.nameRole = options?.nameRole;
  }
}
