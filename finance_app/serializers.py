from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Expense, Category, Budget, SavingsGoal, Bill


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        ['id', 'category','date', 'amount', 'description']
        read_only_fields = ['id']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']
        read_only_fields = ['id']


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'category', 'amount', 'current_amount', 'start_date', 'end_date']
        read_only_fields = ['id']

class SavingsGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingsGoal
        fields = ['id', 'name', 'target_amount', 'current_amount', 'deadline']
        read_only_fields = ['id']

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ['id', 'name', 'amount', 'due_date', 'frequency']
        read_only_fields = ['id']

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}