class DashboardController < ApplicationController
  def index
    @user_amazon_books = current_user
      .user_amazon_books
      .order(added_on: :desc, created_at: :desc)
      .includes(:amazon_book)
  end
end
