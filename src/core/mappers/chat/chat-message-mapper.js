
export const chatMessageMapper = {
    id: (dto) => dto.id,
    contact: (dto) => dto.contact,
    character: (dto) => dto.character,
    content: (dto) => dto.content,
    sentAt: (dto) => dto.sentAt,
    displayOrder: (dto) => dto.displayOrder,
    read: (dto) => dto.read
}
