class CreateAmazonBookPageCounts < ActiveRecord::Migration[5.0]
  def change
    create_table :amazon_book_page_counts do |t|
      t.references :amazon_book, null: false
      t.integer :number_of_pages, null: false

      t.timestamps null: false
    end

    add_foreign_key :amazon_book_page_counts, :amazon_books, on_delete: :cascade, on_update: :cascade
  end
end
