class AmazonBookThumbnail < ApplicationRecord
  belongs_to :amazon_book

  validates :amazon_book,
    presence: true

  validates :url,
    presence: true,
    length: { maximum: 1024 }
end
