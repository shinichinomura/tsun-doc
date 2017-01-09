class AmazonBook < ApplicationRecord
  has_one :thumbnail,
    class_name: 'AmazonBookThumbnail'

  validates :asin,
    presence: true,
    length: { maximum: 16 }

  validates :title,
    presence: true,
    length: { maximum: 512 }

  validates :url,
    presence: true,
    length: { maximum: 2048 }
end
