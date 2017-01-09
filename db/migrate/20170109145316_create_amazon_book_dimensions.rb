class CreateAmazonBookDimensions < ActiveRecord::Migration[5.0]
  def change
    create_table :amazon_book_dimensions do |t|
      t.references :amazon_book, null: false
      t.string :side, null: false, limit: 16
      t.integer :size, null: false
      t.string :unit, null: false, limit: 64

      t.timestamps null: false
    end

    add_foreign_key :amazon_book_dimensions, :amazon_books, on_delete: :cascade, on_update: :cascade
  end
end
