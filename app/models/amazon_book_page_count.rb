class AmazonBookPageCount < ApplicationRecord
  belongs_to :amazon_book

  validates :amazon_book,
    presence: true

  validates :number_of_pages,
    presence: true
end
