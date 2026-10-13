
export const emailDetailMapper = {
    id: (dto) => dto.id,
    sender: (dto) => dto.sender,
    recipient: (dto) => dto.recipient,
    subject: (dto) => dto.subject,
    sentDate: (dto) => dto.sentDate,
    body: (dto) => dto.body
}
