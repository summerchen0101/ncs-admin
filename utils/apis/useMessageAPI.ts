import {
  Message,
  MessageCreateRequest,
  MessageListRequest,
  MessageListResponse,
} from '@/types/api/Message'
import useRequest from '../useRequest'

function useMessageAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MessageListRequest) =>
      post<MessageListResponse>('inbox_message/list', req),
    fetchById: (id: number) => get<Message>(`inbox_message/view/${id}`),
    create: (req: MessageCreateRequest) => post<null>('inbox_message/add', req),
    removeById: (id: number) => post<null>('inbox_message/remove', { id }),
  }
}

export default useMessageAPI
