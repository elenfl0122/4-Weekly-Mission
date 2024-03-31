import { Folder, FolderAPI, Link, LinkAPI, User } from '@/types/api';
import { SystemError } from '@/types/err';
import { totalFolderId } from '@/util/constants';

const BASE_URL = 'https://bootcamp-api.codeit.kr/api';

async function getAPI(query: string) {
  try {
    const response = await fetch(`${BASE_URL}/${query}`);

    if (!response?.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다.');
    }

    const body = await response.json();

    return body;
  } catch (error) {
    const err = error as SystemError;
    console.log(err.message);
  }
}

export function getSampleFolder() {
  return getAPI('sample/folder');
}

export function getSampleUser() {
  return getAPI('sample/user');
}

export async function getUser(): Promise<User> {
  const response = await getAPI('users/1');
  const data = response.data[0];

  const parsedData = {
    ...data,
    imageSource: data['image_source'],
    authId: data['auth_id'],
  };
  return parsedData;
}

export async function getUserFolders(): Promise<Folder[]> {
  const response = await getAPI(`users/4/folders`);
  const parsedData = response.data.map(
    ({ created_at, user_id, ...rest }: FolderAPI) => ({
      ...rest,
      createdAt: created_at,
      userId: user_id,
    })
  );

  return parsedData;
}

export async function getUserLinks(id: number | string): Promise<Link[]> {
  const query =
    id === totalFolderId ? 'users/4/links' : `users/4/links?folderId=${id}`;
  const response = await getAPI(query);

  const parsedData = response.data.map(
    ({ created_at, image_source, ...rest }: LinkAPI) => ({
      ...rest,
      createdAt: created_at,
      imageSource: image_source,
    })
  );

  return parsedData;
}