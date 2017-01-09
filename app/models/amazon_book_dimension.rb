class AmazonBookDimension < ApplicationRecord
  belongs_to :amazon_book

  validates :amazon_book,
    presence: true

  validates :side,
    presence: true,
    inclusion: { in: %w(height width length) }

  validates :size,
    presence: true,
    numericality: { only_integer: true, greater_than: 0 }

  validates :unit,
    presence: true
end
