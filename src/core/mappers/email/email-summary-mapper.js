
export const emailSummaryMapper = {
    id: (dto) => dto.id,
    sender: (dto) => dto.sender,
    subject: (dto) => dto.subject,
    sentDate: (dto) => dto.sentDate,
    read: (dto) => dto.read
}
